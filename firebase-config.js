/**
 * Firebase Configuration for Matchbook MLBB
 * 
 * HOW TO SET UP:
 * 1. Go to https://console.firebase.google.com
 * 2. Click "Create a project" (or "Add project")
 * 3. Name it something like "matchbook-mlbb"
 * 4. Disable Google Analytics (optional, not needed)
 * 5. Once created, click the web icon "</>" to add a web app
 * 6. Register the app (any nickname)
 * 7. Copy the firebaseConfig values below
 * 8. Then go to "Realtime Database" in the left sidebar
 * 9. Click "Create Database"
 * 10. Choose your region, start in TEST MODE
 * 11. Your databaseURL will appear — paste it below
 * 
 * IMPORTANT: Set your Realtime Database rules to allow read/write:
 * {
 *   "rules": {
 *     ".read": true,
 *     ".write": true
 *   }
 * }
 * 
 * For production, you should restrict write access.
 */

const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
