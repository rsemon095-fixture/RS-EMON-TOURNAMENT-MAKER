/*=========================================
      RS Emon Tournament Maker
              app.js
             Part - 1
=========================================*/

// Splash Screen
const splash = document.getElementById("splash-screen");
const app = document.getElementById("app");

// App প্রথমে Hide থাকবে
app.style.display = "none";

// ৩ সেকেন্ড পরে Splash Hide হবে
window.addEventListener("load", () => {

    setTimeout(() => {

        splash.style.opacity = "0";
        splash.style.visibility = "hidden";

        app.style.display = "block";

    }, 3000);

});

/*=========================================
        RGB Header Animation
=========================================*/

const rgbName = document.getElementById("rgb-name");

const colors = [

"#00ff99",
"#00ffff",
"#ffd700",
"#ff3b30",
"#00ff99"

];

let colorIndex = 0;

setInterval(() => {

    if(rgbName){

        rgbName.style.color = colors[colorIndex];

        colorIndex++;

        if(colorIndex >= colors.length){

            colorIndex = 0;

        }

    }

},700);

/*=========================================
        Loading Console
=========================================*/

console.log("RS Emon Tournament Maker Loaded Successfully");

/*=========================================
        App Version
=========================================*/

const APP_VERSION = "1.0.0";

console.log("Version :",APP_VERSION);
/*=========================================
        Language Switch
=========================================*/

const languageBtn = document.getElementById("language");

let currentLanguage = "en";

const lang = {

    en:{

        welcome:"WELCOME",
        running:"Running Tournament",
        notice:"Latest Notice"

    },

    bn:{

        welcome:"স্বাগতম",
        running:"চলমান টুর্নামেন্ট",
        notice:"সর্বশেষ নোটিশ"

    }

};

languageBtn?.addEventListener("click",()=>{

    if(currentLanguage==="en"){

        currentLanguage="bn";

        languageBtn.innerHTML="🇬🇧 English";

    }else{

        currentLanguage="en";

        languageBtn.innerHTML="🇧🇩 বাংলা";

    }

});

/*=========================================
      Tournament Name Change
=========================================*/

const tournamentName=document.getElementById("tournamentName");

const tournaments=[

"RS Premier League",
"RS Champions Cup",
"Football Super League",
"Emon Gold Cup"

];

let tournamentIndex=0;

setInterval(()=>{

if(tournamentName){

tournamentName.innerText=tournaments[tournamentIndex];

tournamentIndex++;

if(tournamentIndex>=tournaments.length){

tournamentIndex=0;

}

}

},5000);

/*=========================================
      Notice Auto Change
=========================================*/

const noticeMessages=[

"📢 Welcome To RS Emon Tournament Maker",

"⚽ Registration Is Open",

"🏆 Best Of Luck To All Teams",

"🔥 Powered By RS Emon"

];

let noticeIndex=0;

const notice=document.querySelector(".notice-card p");

setInterval(()=>{

if(notice){

notice.innerHTML=noticeMessages[noticeIndex];

noticeIndex++;

if(noticeIndex>=noticeMessages.length){

noticeIndex=0;

}

}

},6000);

/*=========================================
      Notification
=========================================*/

function showNotification(message){

console.log("Notification :",message);

}

showNotification("Application Started Successfully");
/*=========================================
        Live Score System
=========================================*/

let scoreA = 0;
let scoreB = 0;

const scoreAText = document.getElementById("scoreA");
const scoreBText = document.getElementById("scoreB");

function updateScore() {

    if (scoreAText) scoreAText.innerHTML = scoreA;
    if (scoreBText) scoreBText.innerHTML = scoreB;

}

/*=========================================
        Demo Score Update
=========================================*/

setInterval(() => {

    const randomTeam = Math.floor(Math.random() * 2);

    if (randomTeam === 0) {

        scoreA++;

    } else {

        scoreB++;

    }

    updateScore();

}, 15000);

/*=========================================
        Online / Offline Status
=========================================*/

const statusText = document.querySelector(".status");

function updateOnlineStatus() {

    if (!statusText) return;

    if (navigator.onLine) {

        statusText.innerHTML = "🟢 ONLINE";
        statusText.style.background = "#00c853";

    } else {

        statusText.innerHTML = "🔴 OFFLINE";
        statusText.style.background = "#ff3b30";

    }

}

window.addEventListener("online", updateOnlineStatus);
window.addEventListener("offline", updateOnlineStatus);

updateOnlineStatus();

/*=========================================
        Auto Refresh Data
=========================================*/

setInterval(() => {

    console.log("Refreshing Tournament Data...");

}, 30000);

/*=========================================
        Welcome Message
=========================================*/

setTimeout(() => {

    console.log("Welcome to RS Emon Tournament Maker");

}, 1000);
/*=========================================
        SETTINGS SYSTEM
=========================================*/

const SETTINGS_KEY = "rsEmonSettings";

let settings = {

    theme: "dark",
    language: "en",
    notification: true

};

// Load Settings
if (localStorage.getItem(SETTINGS_KEY)) {

    settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));

}

// Save Settings
function saveSettings() {

    localStorage.setItem(
        SETTINGS_KEY,
        JSON.stringify(settings)
    );

}

/*=========================================
        Theme System
=========================================*/

function changeTheme(theme) {

    if (theme === "light") {

        document.body.classList.add("light-theme");

    } else {

        document.body.classList.remove("light-theme");

    }

    settings.theme = theme;

    saveSettings();

}

// Auto Load Theme
changeTheme(settings.theme);

/*=========================================
        Notice Popup
=========================================*/

function showPopup(message) {

    const popup = document.createElement("div");

    popup.className = "popup-message";

    popup.innerHTML = message;

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.classList.add("show");

    }, 100);

    setTimeout(() => {

        popup.classList.remove("show");

        setTimeout(() => {

            popup.remove();

        }, 500);

    }, 3000);

}

// Welcome Popup
setTimeout(() => {

    showPopup("👋 Welcome to RS Emon Tournament Maker");

}, 4000);

/*=========================================
        Update Checker
=========================================*/

const CURRENT_VERSION = "1.0.0";
const LATEST_VERSION = "1.0.0";

function checkForUpdate() {

    if (CURRENT_VERSION !== LATEST_VERSION) {

        showPopup("🚀 New Update Available");

    } else {

        console.log("Application is Up To Date");

    }

}

checkForUpdate();

/*=========================================
        Notification Permission
=========================================*/

if ("Notification" in window) {

    if (Notification.permission !== "granted") {

        Notification.requestPermission();

    }

}
/*=========================================
      FIREBASE READY (Part-5)
=========================================*/

// Firebase Data Object

let tournamentData = {

    tournamentName: "RS Premier League",

    status: "LIVE",

    notice: "Welcome To RS Emon Tournament Maker",

    teamA: "Team A",

    teamB: "Team B",

    scoreA: 0,

    scoreB: 0

};

/*=========================================
      LOAD TOURNAMENT DATA
=========================================*/

function loadTournamentData() {

    const name = document.getElementById("tournamentName");

    if(name){

        name.innerHTML = tournamentData.tournamentName;

    }

    const scoreA = document.getElementById("scoreA");

    const scoreB = document.getElementById("scoreB");

    if(scoreA){

        scoreA.innerHTML = tournamentData.scoreA;

    }

    if(scoreB){

        scoreB.innerHTML = tournamentData.scoreB;

    }

}

/*=========================================
      UPDATE NOTICE
=========================================*/

function updateNotice(message){

    const notice = document.querySelector(".notice-card p");

    if(notice){

        notice.innerHTML = "📢 " + message;

    }

}

/*=========================================
      UPDATE STATUS
=========================================*/

function updateStatus(status){

    const statusBox = document.querySelector(".status");

    if(!statusBox) return;

    statusBox.innerHTML = status;

    if(status=="LIVE"){

        statusBox.style.background="#00c853";

    }else{

        statusBox.style.background="#ff3b30";

    }

}

/*=========================================
      DEMO AUTO UPDATE
=========================================*/

setInterval(()=>{

    tournamentData.scoreA++;

    tournamentData.scoreB++;

    loadTournamentData();

},20000);

/*=========================================
      INITIAL LOAD
=========================================*/

loadTournamentData();

updateNotice(tournamentData.notice);

updateStatus(tournamentData.status);

console.log("Firebase Module Ready");
/*=========================================
      FIREBASE CONNECTION
=========================================*/

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,

doc,

getDoc,

onSnapshot

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/*=========================================
      YOUR FIREBASE CONFIG
=========================================*/

const firebaseConfig = {

apiKey: "",

authDomain: "",

projectId: "",

storageBucket: "",

messagingSenderId: "",

appId: ""

};

/*=========================================
      INITIALIZE FIREBASE
=========================================*/

const appFirebase = initializeApp(firebaseConfig);

const db = getFirestore(appFirebase);

/*=========================================
      LIVE DATA LISTENER
=========================================*/

const tournamentRef = doc(db,"live","tournament");

onSnapshot(tournamentRef,(snapshot)=>{

if(snapshot.exists()){

const data=snapshot.data();

/* Tournament */

if(document.getElementById("tournamentName")){

document.getElementById("tournamentName").innerHTML=data.name;

}

/* Score */

if(document.getElementById("scoreA")){

document.getElementById("scoreA").innerHTML=data.scoreA;

}

if(document.getElementById("scoreB")){

document.getElementById("scoreB").innerHTML=data.scoreB;

}

/* Notice */

const notice=document.querySelector(".notice-card p");

if(notice){

notice.innerHTML="📢 "+data.notice;

}

/* Status */

const status=document.querySelector(".status");

if(status){

status.innerHTML=data.status;

}

console.log("Live Data Updated");

}

});

/*=========================================
      CHECK CONNECTION
=========================================*/

async function checkFirebase(){

try{

const snap=await getDoc(tournamentRef);

if(snap.exists()){

console.log("Firebase Connected");

}else{

console.log("No Tournament Data");

}

}catch(error){

console.error(error);

}

}

checkFirebase();

/*=========================================
      AUTO RECONNECT
=========================================*/

window.addEventListener("online",()=>{

console.log("Internet Connected");

checkFirebase();

});

window.addEventListener("offline",()=>{

console.log("Internet Disconnected");

});

/*=========================================
      END OF APP.JS
=========================================*/

console.log("RS Emon Tournament Maker Ready 🚀");
