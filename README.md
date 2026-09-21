# Matchbook — MLBB Tournament Tracker

A sleek tournament stats tracker for **Mobile Legends: Bang Bang** with real-time online sync.

## Features

### ☁️ Online Database
- **Firebase Realtime Database** — data syncs across all devices in real-time
- No more "data only on this browser" — share the link and everyone sees the same stats
- Automatic localStorage fallback for offline usage

### ♟ Team & Player Roster
- Register teams and players in the admin workspace
- Players auto-fill when you select a team during game recording
- Default roles are remembered and pre-populated

### 🎮 Smart Game Recording
- **Hero dropdown** — searchable combobox with all 133 MLBB heroes
- **Auto-fill** — select your team and opponent, player names & roles fill automatically
- **Connected fields** — no more typing the same name, hero, and role every game

### 📊 Liquipedia-Style Viewer
- **Participating Teams** section at the top showing rosters
- **Sortable leaderboards** — sort by kills, deaths, assists, KDA, win rate, games played
- **Hero trends** — sort by pick rate, win rate, or KDA
- **Real-time updates** — no refresh needed

## Setup

### 1. Deploy the Files
Host the files on any static hosting (GitHub Pages, Netlify, Vercel, etc.).

### 2. Configure Firebase (Required for Online Sync)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (e.g., "matchbook-mlbb")
3. Add a web app to your project
4. Copy the config values
5. Go to **Realtime Database** → **Create Database** → Start in **Test Mode**
6. Edit `firebase-config.js` and paste your config values:

```js
const FIREBASE_CONFIG = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 3. Set Database Rules

In the Firebase Console → Realtime Database → Rules, set:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

> ⚠️ For production, restrict write access to authenticated users.

## File Structure

```
matchbook-mlbb/
├── index.html          # Public viewer page (Liquipedia-style)
├── role-guide.html     # Landing / about page
├── admin/
│   └── index.html      # Admin workspace (recording, roster, dashboard)
├── firebase-config.js  # Firebase project credentials
├── heroes.js           # Complete MLBB hero list (133 heroes)
├── db.js               # Database abstraction layer
└── README.md
```


## Usage Workflow

1. **Register roster** — Go to Admin → Roster tab → Add teams and players
2. **Record a game** — Go to Admin → Record a game → Select teams (auto-fills players) → Pick heroes from dropdown → Enter stats → Save
3. **View stats** — Open the public viewer page → See teams, leaderboards, results
4. **Share** — Send the viewer URL to anyone — they'll see the same data in real-time
