// ==========================================
// RS Emon Tournament Maker
// Firebase Configuration
// ==========================================

// Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import {
getFirestore,
collection,
doc,
getDoc,
getDocs,
setDoc,
updateDoc,
onSnapshot
}
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ==========================================
// Firebase Config
// ==========================================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmCW3Nx8CAsuhKs4bvsWWRsgaVyrEPNns",
  authDomain: "rsemon-maker.firebaseapp.com",
  projectId: "rsemon-maker",
  storageBucket: "rsemon-maker.firebasestorage.app",
  messagingSenderId: "316755169140",
  appId: "1:316755169140:web:9d471bb5f0c51b3a4c6621"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ==========================================
// Initialize Firebase
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
