// ==========================================
// RS Emon Tournament Maker
// Firebase Config
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCmCW3Nx8CAsuhKs4bvsWWRsgaVyrEPNns",
  authDomain: "rsemon-maker.firebaseapp.com",
  databaseURL: "https://rsemon-maker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rsemon-maker",
  storageBucket: "rsemon-maker.firebasestorage.app",
  messagingSenderId: "316755169140",
  appId: "1:316755169140:web:9d471bb5f0c51b3a4c6621"
};


const app = initializeApp(firebaseConfig);


const db = getDatabase(app);

const auth = getAuth(app);


export { db, auth };
