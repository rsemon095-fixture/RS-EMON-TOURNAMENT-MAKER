/*=========================================
      RS Emon Tournament Maker
            ADMIN PANEL
             Part - 1
=========================================*/

console.log("RS Emon Admin Panel Started");

/*=========================================
        Elements
=========================================*/

const tournamentInput = document.getElementById("tournamentInput");
const statusInput = document.getElementById("statusInput");

const teamA = document.getElementById("teamA");
const teamB = document.getElementById("teamB");

const scoreAInput = document.getElementById("scoreAInput");
const scoreBInput = document.getElementById("scoreBInput");

const noticeInput = document.getElementById("noticeInput");

/*=========================================
        Buttons
=========================================*/

const saveTournament =
document.getElementById("saveTournament");

const saveLive =
document.getElementById("saveLive");

const saveNotice =
document.getElementById("saveNotice");

/*=========================================
        Local Data
=========================================*/

let tournamentData = {

    name: "",

    status: "OFFLINE",

    teamA: "",

    teamB: "",

    scoreA: 0,

    scoreB: 0,

    notice: ""

};

/*=========================================
        Save Tournament
=========================================*/

saveTournament.addEventListener("click",()=>{

    tournamentData.name =
    tournamentInput.value;

    tournamentData.status =
    statusInput.value;

    alert("✅ Tournament Saved");

    console.log(tournamentData);

});

/*=========================================
        Save Live Match
=========================================*/

saveLive.addEventListener("click",()=>{

    tournamentData.teamA =
    teamA.value;

    tournamentData.teamB =
    teamB.value;

    tournamentData.scoreA =
    Number(scoreAInput.value);

    tournamentData.scoreB =
    Number(scoreBInput.value);

    alert("⚽ Live Match Updated");

    console.log(tournamentData);

});

/*=========================================
        Save Notice
=========================================*/

saveNotice.addEventListener("click",()=>{

    tournamentData.notice =
    noticeInput.value;

    alert("📢 Notice Published");

    console.log(tournamentData);

});
/*=========================================
        FIREBASE PART - 2
=========================================*/

import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {

getFirestore,

doc,

setDoc,

serverTimestamp

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/*=========================================
        FIREBASE CONFIG
=========================================*/

const firebaseConfig={

apiKey:"",

authDomain:"",

projectId:"",

storageBucket:"",

messagingSenderId:"",

appId:""

};

const firebaseApp=initializeApp(firebaseConfig);

const db=getFirestore(firebaseApp);

/*=========================================
        SAVE TO FIREBASE
=========================================*/

async function saveTournamentData(){

try{

await setDoc(

doc(db,"live","tournament"),

{

name:tournamentData.name,

status:tournamentData.status,

teamA:tournamentData.teamA,

teamB:tournamentData.teamB,

scoreA:tournamentData.scoreA,

scoreB:tournamentData.scoreB,

notice:tournamentData.notice,

updatedAt:serverTimestamp()

}

);

alert("✅ Firebase Updated Successfully");

console.log("Firebase Saved");

}catch(error){

console.error(error);

alert("❌ Firebase Error");

}

}

/*=========================================
        SAVE BUTTON EVENTS
=========================================*/

saveTournament.addEventListener("click",()=>{

tournamentData.name=tournamentInput.value;

tournamentData.status=statusInput.value;

saveTournamentData();

});

saveLive.addEventListener("click",()=>{

tournamentData.teamA=teamA.value;

tournamentData.teamB=teamB.value;

tournamentData.scoreA=Number(scoreAInput.value);

tournamentData.scoreB=Number(scoreBInput.value);

saveTournamentData();

});

saveNotice.addEventListener("click",()=>{

tournamentData.notice=noticeInput.value;

saveTournamentData();

});

/*=========================================
        READY
=========================================*/

console.log("Firebase Sync Ready");
/*=========================================
        ADMIN PANEL PART - 3
=========================================*/

/*=========================================
        ELEMENTS
=========================================*/

const maintenanceBtn = document.getElementById("maintenanceBtn");
const updateBtn = document.getElementById("updateBtn");
const savePoints = document.getElementById("savePoints");
const saveStats = document.getElementById("saveStats");
const logoutBtn = document.getElementById("logoutBtn");

/*=========================================
        MAINTENANCE MODE
=========================================*/

let maintenance = false;

maintenanceBtn?.addEventListener("click", async () => {

    maintenance = !maintenance;

    await setDoc(doc(db,"system","settings"),{

        maintenance:maintenance,
        updatedAt:serverTimestamp()

    },{merge:true});

    alert(

        maintenance
        ? "🔧 Maintenance Mode ON"
        : "✅ Maintenance Mode OFF"

    );

});

/*=========================================
        FORCE UPDATE
=========================================*/

updateBtn?.addEventListener("click",async()=>{

    const version=Date.now().toString();

    await setDoc(doc(db,"system","version"),{

        latestVersion:version,
        updatedAt:serverTimestamp()

    });

    alert("🚀 Force Update Sent");

});

/*=========================================
        SAVE POINT TABLE
=========================================*/

savePoints?.addEventListener("click",async()=>{

    const team=document.getElementById("pointTeam").value;

    const points=Number(
        document.getElementById("pointValue").value
    );

    await setDoc(doc(db,"points",team),{

        team:team,

        points:points,

        updatedAt:serverTimestamp()

    });

    alert("🏆 Points Saved");

});

/*=========================================
        SAVE STATISTICS
=========================================*/

saveStats?.addEventListener("click",async()=>{

    await setDoc(doc(db,"statistics","main"),{

        totalTeams:Number(document.getElementById("totalTeams").value),

        totalMatches:Number(document.getElementById("totalMatches").value),

        totalGoals:Number(document.getElementById("totalGoals").value),

        updatedAt:serverTimestamp()

    });

    alert("📊 Statistics Saved");

});

/*=========================================
        LOGOUT
=========================================*/

logoutBtn?.addEventListener("click",()=>{

    if(confirm("Logout Admin Panel?")){

        window.location.href="index.html";

    }

});

/*=========================================
        READY
=========================================*/

console.log("✅ RS Emon Admin Panel Ready");
