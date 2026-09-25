/**
 * Matchbook Database Layer
 * Abstracts Firebase Realtime Database operations with localStorage fallback.
 * 
 * If Firebase is configured (config values are not placeholders),
 * data syncs to/from Firebase Realtime Database in real-time.
 * Otherwise, falls back to localStorage only.
 */

const DB_VERSION = 'matchbook-mlbb-v2';
const LOCAL_GAMES = 'matchbook-games-v2';
const LOCAL_ROSTER = 'matchbook-roster-v2';

let _db = null;
let _firebaseReady = false;
let _onGamesChange = null;
let _onRosterChange = null;

/**
 * Initialize the database connection.
 * Returns a promise that resolves when ready.
 */
async function initDB() {
  // Check if Firebase config has real values
  if (typeof FIREBASE_CONFIG !== 'undefined' &&
      FIREBASE_CONFIG.apiKey &&
      !FIREBASE_CONFIG.apiKey.includes('YOUR_')) {
    try {
      // Firebase is loaded via CDN before this script
      if (typeof firebase !== 'undefined') {
        firebase.initializeApp(FIREBASE_CONFIG);
        _db = firebase.database();
        _firebaseReady = true;
        console.log('[Matchbook] Connected to Firebase');

        // Migrate localStorage data to Firebase if it exists
        await migrateLocalToFirebase();
        return true;
      }
    } catch (err) {
      console.warn('[Matchbook] Firebase init failed, using localStorage:', err);
    }
  }
  console.log('[Matchbook] Using localStorage (Firebase not configured)');
  return false;
}

/**
 * Migrate any existing localStorage data to Firebase (one-time)
 */
async function migrateLocalToFirebase() {
  const migrated = localStorage.getItem('matchbook-migrated-v2');
  if (migrated) return;

  // Migrate old v1 games
  const oldGames = JSON.parse(localStorage.getItem('matchbook-mlbb-v1') || '[]');
  const localGames = JSON.parse(localStorage.getItem(LOCAL_GAMES) || '[]');
  const allGames = [...localGames, ...oldGames];

  if (allGames.length > 0) {
    const gamesObj = {};
    allGames.forEach(g => { gamesObj[g.id] = g; });
    await _db.ref('games').update(gamesObj);
    console.log(`[Matchbook] Migrated ${allGames.length} games to Firebase`);
  }

  // Migrate roster if exists
  const localRoster = JSON.parse(localStorage.getItem(LOCAL_ROSTER) || 'null');
  if (localRoster) {
    await _db.ref('roster').set(localRoster);
    console.log('[Matchbook] Migrated roster to Firebase');
  }

  localStorage.setItem('matchbook-migrated-v2', 'true');
}

// ─── GAMES ────────────────────────────────────────────

/**
 * Save a game record
 */
async function dbSaveGame(game) {
  if (_firebaseReady) {
    await _db.ref('games/' + game.id).set(game);
  } else {
    const games = dbGetGamesLocal();
    games.unshift(game);
    localStorage.setItem(LOCAL_GAMES, JSON.stringify(games));
  }
}

/**
 * Get all games (returns from local cache; Firebase listener keeps it updated)
 */
function dbGetGamesLocal() {
  return JSON.parse(localStorage.getItem(LOCAL_GAMES) || '[]');
}

/**
 * Delete a game by ID
 */
async function dbDeleteGame(gameId) {
  if (_firebaseReady) {
    await _db.ref('games/' + gameId).remove();
  } else {
    let games = dbGetGamesLocal();
    games = games.filter(g => g.id !== gameId);
    localStorage.setItem(LOCAL_GAMES, JSON.stringify(games));
  }
}

/**
 * Clear all games
 */
async function dbClearGames() {
  if (_firebaseReady) {
    await _db.ref('games').remove();
  }
  localStorage.removeItem(LOCAL_GAMES);
}

/**
 * Listen for games changes (Firebase real-time or initial local load)
 */
function dbListenGames(callback) {
  _onGamesChange = callback;
  if (_firebaseReady) {
    _db.ref('games').on('value', snapshot => {
      const data = snapshot.val() || {};
      const games = Object.values(data).sort((a, b) =>
        new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
      );
      // Cache locally for offline
      localStorage.setItem(LOCAL_GAMES, JSON.stringify(games));
      callback(games);
    });
  } else {
    callback(dbGetGamesLocal());
  }
}

// ─── ROSTER ───────────────────────────────────────────

/**
 * Save the entire roster (teams and players)
 * roster = { teams: { teamId: { id, name } }, players: { playerId: { id, name, teamId, role } } }
 */
async function dbSaveRoster(roster) {
  if (_firebaseReady) {
    await _db.ref('roster').set(roster);
  }
  localStorage.setItem(LOCAL_ROSTER, JSON.stringify(roster));
}

/**
 * Save a single team
 */
async function dbSaveTeam(team) {
  if (_firebaseReady) {
    await _db.ref('roster/teams/' + team.id).set(team);
  }
  // Also update local
  const roster = dbGetRosterLocal();
  roster.teams[team.id] = team;
  localStorage.setItem(LOCAL_ROSTER, JSON.stringify(roster));
}

/**
 * Delete a team and its players
 */
async function dbDeleteTeam(teamId) {
  const roster = dbGetRosterLocal();
  delete roster.teams[teamId];
  // Remove players belonging to this team
  Object.keys(roster.players).forEach(pid => {
    if (roster.players[pid].teamId === teamId) delete roster.players[pid];
  });
  if (_firebaseReady) {
    await _db.ref('roster').set(roster);
  }
  localStorage.setItem(LOCAL_ROSTER, JSON.stringify(roster));
}

/**
 * Save a single player
 */
async function dbSavePlayer(player) {
  if (_firebaseReady) {
    await _db.ref('roster/players/' + player.id).set(player);
  }
  const roster = dbGetRosterLocal();
  roster.players[player.id] = player;
  localStorage.setItem(LOCAL_ROSTER, JSON.stringify(roster));
}

/**
 * Delete a player
 */
async function dbDeletePlayer(playerId) {
  if (_firebaseReady) {
    await _db.ref('roster/players/' + playerId).remove();
  }
  const roster = dbGetRosterLocal();
  delete roster.players[playerId];
  localStorage.setItem(LOCAL_ROSTER, JSON.stringify(roster));
}

/**
 * Get roster from local cache
 */
function dbGetRosterLocal() {
  return JSON.parse(localStorage.getItem(LOCAL_ROSTER) || '{"teams":{},"players":{}}');
}

/**
 * Listen for roster changes
 */
function dbListenRoster(callback) {
  _onRosterChange = callback;
  if (_firebaseReady) {
    _db.ref('roster').on('value', snapshot => {
      const data = snapshot.val() || { teams: {}, players: {} };
      if (!data.teams) data.teams = {};
      if (!data.players) data.players = {};
      localStorage.setItem(LOCAL_ROSTER, JSON.stringify(data));
      callback(data);
    });
  } else {
    callback(dbGetRosterLocal());
  }
}

// ─── TOURNAMENT INFO ──────────────────────────────────

/**
 * Save tournament info (name, subtitle, etc.)
 */
async function dbSaveTournamentInfo(info) {
  if (_firebaseReady) {
    await _db.ref('tournament').set(info);
  }
  localStorage.setItem('matchbook-tournament', JSON.stringify(info));
}

/**
 * Listen for tournament info changes
 */
function dbListenTournament(callback) {
  if (_firebaseReady) {
    _db.ref('tournament').on('value', snapshot => {
      const data = snapshot.val() || {};
      localStorage.setItem('matchbook-tournament', JSON.stringify(data));
      callback(data);
    });
  } else {
    callback(JSON.parse(localStorage.getItem('matchbook-tournament') || '{}'));
  }
}

// ─── EXPORT / IMPORT ──────────────────────────────────

/**
 * Export all data as a JSON object
 */
async function dbExportAll() {
  const games = dbGetGamesLocal();
  const roster = dbGetRosterLocal();
  const tournament = JSON.parse(localStorage.getItem('matchbook-tournament') || '{}');
  return {
    exportedAt: new Date().toISOString(),
    version: DB_VERSION,
    games,
    roster,
    tournament
  };
}

/**
 * Import data from a backup JSON object
 */
async function dbImportAll(data) {
  if (data.games && Array.isArray(data.games)) {
    for (const game of data.games) {
      await dbSaveGame(game);
    }
  }
  if (data.roster) {
    await dbSaveRoster(data.roster);
  }
  if (data.tournament) {
    await dbSaveTournamentInfo(data.tournament);
  }
}

// --- ANALYTICS -------------------------------------------------------------

/**
 * Track a page view and handle presence
 */
function dbTrackView() {
  if (!_firebaseReady) return;

  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'mobile' : 'desktop';

  // Prevent double counting per session
  if (!sessionStorage.getItem('matchbook_viewed')) {
    _db.ref(nalytics/views/daily/).set(firebase.database.ServerValue.increment(1));
    _db.ref(nalytics/devices/).set(firebase.database.ServerValue.increment(1));
    sessionStorage.setItem('matchbook_viewed', 'true');
  }

  // Presence system
  const connectedRef = _db.ref('.info/connected');
  const myConnectionsRef = _db.ref('analytics/presence').push();

  connectedRef.on('value', (snap) => {
    if (snap.val() === true) {
      myConnectionsRef.onDisconnect().remove();
      myConnectionsRef.set(true);
    }
  });
}

/**
 * Track clicks on profiles and matches
 */
function dbTrackClick(type, id) {
  if (!_firebaseReady || !id) return;
  // sanitize ID for firebase keys
  const safeId = String(id).replace(/[.#$\/\[\]]/g, '_');
  _db.ref(nalytics/clicks//).set(firebase.database.ServerValue.increment(1));
}

/**
 * Listen for analytics data (Admin)
 */
function dbListenAnalytics(callback) {
  if (!_firebaseReady) return;
  _db.ref('analytics').on('value', snap => {
    callback(snap.val() || {});
  });
}

