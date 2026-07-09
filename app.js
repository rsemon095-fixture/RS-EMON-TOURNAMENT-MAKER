/*=========================================
 RS Emon Tournament Maker
 app.js Part-1
=========================================*/
import { db } from "./firebase.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
"use strict";

// ===============================
// APP VERSION
// ===============================

const APP = {

    name: "RS Emon Tournament Maker",

    version: "1.0.0",

    language: "en",

    maintenance: false

};

// ===============================
// DOM
// ===============================

const splash = document.getElementById("splash-screen");
const app = document.getElementById("app");
const languageBtn = document.getElementById("language");

// ===============================
// START APP
// ===============================

window.addEventListener("load", () => {

    setTimeout(() => {

        splash.style.opacity = "0";

        splash.style.pointerEvents = "none";

        splash.style.transition = ".8s";

        setTimeout(() => {

            splash.remove();

        },800);

    },2500);

});

// ===============================
// TOAST MESSAGE
// ===============================

function showToast(message){

    const toast = document.createElement("div");

    toast.className="toast";

    toast.innerHTML=message;

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.classList.add("show");

    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{

            toast.remove();

        },500);

    },3000);

}

// ===============================
// LANGUAGE
// ===============================

let currentLanguage="en";

languageBtn.onclick=()=>{

    if(currentLanguage==="en"){

        currentLanguage="bn";

        languageBtn.innerHTML="🇺🇸 English";

        document.querySelector(".hero-overlay h1").innerHTML="স্বাগতম";

        document.querySelector(".hero-overlay h2").innerHTML="ফুটবল টুর্নামেন্ট";

        document.querySelector(".hero-overlay p").innerHTML="তৈরি করুন • পরিচালনা করুন • লাইভ আপডেট";

        showToast("বাংলা চালু হয়েছে");

    }

    else{

        currentLanguage="en";

        languageBtn.innerHTML="🇧🇩 বাংলা";

        document.querySelector(".hero-overlay h1").innerHTML="WELCOME";

        document.querySelector(".hero-overlay h2").innerHTML="FOOTBALL TOURNAMENT";

        document.querySelector(".hero-overlay p").innerHTML="Create • Manage • Live Update";

        showToast("English Enabled");

    }

};

// ===============================
// LIVE CLOCK
// ===============================

function liveClock(){

    const now=new Date();

    console.log(now.toLocaleTimeString());

}

setInterval(liveClock,1000);

// ===============================
// NETWORK STATUS
// ===============================

window.addEventListener("online",()=>{

    showToast("🟢 Internet Connected");

});

window.addEventListener("offline",()=>{

    showToast("🔴 No Internet");

});

// ===============================
// ACTIVE MENU
// ===============================

document.querySelectorAll(".bottom-nav a")

.forEach(button=>{

button.onclick=function(){

document.querySelectorAll(".bottom-nav a")

.forEach(x=>x.classList.remove("active"));

this.classList.add("active");

};

});

// ===============================
// RGB TITLE
// ===============================

setInterval(()=>{

const title=document.getElementById("rgb-name");

if(title){

title.style.transform="scale(1.03)";

setTimeout(()=>{

title.style.transform="scale(1)";

},400);

}

},2000);

// ===============================
// APP READY
// ===============================

console.log(APP.name);

console.log(APP.version);

showToast("Welcome to RS Emon Tournament Maker");
/*=========================================
 RS Emon Tournament Maker
 app.js Part-2
=========================================*/

// ===============================
// MAINTENANCE MODE
// ===============================

let maintenanceMode = false;

function checkMaintenance() {

    if (maintenanceMode) {

        document.body.innerHTML = `

        <div class="maintenance">

            <h1>⚠ Maintenance</h1>

            <p>

            RS Emon Tournament Maker is updating.

            Please wait...

            </p>

        </div>

        `;

    }

}

// ===============================
// VERSION CHECK
// ===============================

const CURRENT_VERSION = "1.0.0";

const SERVER_VERSION = "1.0.0";

function checkVersion(){

    if(CURRENT_VERSION !== SERVER_VERSION){

        showToast("New Update Available");

    }

}

checkVersion();

// ===============================
// TOURNAMENT DATA
// ===============================

const tournament = {

    name:"No Tournament",

    status:"Offline",

    teams:0,

    matches:0

};

function loadTournament(){

    const title=document.getElementById("tournamentName");

    if(title){

        title.innerHTML=tournament.name;

    }

}

loadTournament();

// ===============================
// LIVE SCORE
// ===============================

const liveScore={

teamA:0,

teamB:0

};

function updateLiveScore(){

    const scoreA=document.getElementById("scoreA");

    const scoreB=document.getElementById("scoreB");

    if(scoreA) scoreA.innerHTML=liveScore.teamA;

    if(scoreB) scoreB.innerHTML=liveScore.teamB;

}

updateLiveScore();

// ===============================
// AUTO REFRESH
// ===============================

setInterval(()=>{

    updateLiveScore();

    loadTournament();

},5000);

// ===============================
// NOTICE
// ===============================

let noticeText="Welcome to RS Emon Tournament Maker";

function loadNotice(){

const notice=document.querySelector(".notice-card p");

if(notice){

notice.innerHTML=noticeText;

}

}

loadNotice();

// ===============================
// FUTURE FIREBASE
// ===============================

function loadFirebase(){

console.log("Firebase Ready");

}

loadFirebase();

// ===============================
// ADMIN CHECK
// ===============================

let admin=false;

function adminLogin(){

if(admin){

console.log("Admin Logged");

}

else{

console.log("User Mode");

}

}

adminLogin();

// ===============================
// APP START
// ===============================

window.onload=()=>{

checkMaintenance();

loadTournament();

updateLiveScore();

loadNotice();

showToast("Application Ready");

};
// তোমার সব কোড থাকবে...

// ----------------------------
// Maintenance Check
// ----------------------------

