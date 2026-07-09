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

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "000000000",

appId: "YOUR_APP_ID"

};

// ==========================================
// Initialize Firebase
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
