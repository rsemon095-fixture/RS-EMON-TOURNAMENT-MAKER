// ==========================================
// RS Emon Tournament Maker
// Firebase Realtime Database Config
// ==========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { 
  getDatabase 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";


// Firebase Config (তোমার আসলটা এখানে থাকবে)
const firebaseConfig = {
  apiKey: "তোমার API KEY",
  authDomain: "তোমার PROJECT.firebaseapp.com",
  databaseURL: "https://rsemon-maker-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "তোমার PROJECT ID",
  storageBucket: "তোমার STORAGE BUCKET",
  messagingSenderId: "তোমার SENDER ID",
  appId: "তোমার APP ID"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { 
getAuth 
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";


const auth = getAuth(app);


export { db, auth };
