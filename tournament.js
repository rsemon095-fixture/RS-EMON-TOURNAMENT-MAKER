/*=========================================
 RS Emon Tournament Maker
 tournament.js
 Version 1.0
=========================================*/

import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// ==========================
// Elements
// ==========================

const btn = document.getElementById("saveTournament");
const status = document.getElementById("saveStatus");

// ==========================
// Save Tournament
// ==========================

btn.addEventListener("click", saveTournament);

async function saveTournament() {

const tournamentName =
document.getElementById("tournamentName").value.trim();

const season =
document.getElementById("season").value.trim();

const startDate =
document.getElementById("startDate").value;

const endDate =
document.getElementById("endDate").value;

const tournamentType =
document.getElementById("tournamentType").value;

const totalTeams =
parseInt(document.getElementById("totalTeams").value);

const groups =
parseInt(document.getElementById("groups").value);

const matchTime =
parseInt(document.getElementById("matchTime").value);

const extraTime =
document.getElementById("extraTime").value;

const penalty =
document.getElementById("penalty").value;


// ==========================
// Validation
// ==========================

if(tournamentName===""){

status.innerHTML="❌ Tournament Name Required";

return;

}

if(isNaN(totalTeams) || totalTeams<2){

status.innerHTML="❌ Enter Valid Team Number";

return;

}

status.innerHTML="⏳ Saving Tournament...";

try{

await addDoc(collection(db,"tournaments"),{

tournamentName,

season,

startDate,

endDate,

tournamentType,

totalTeams,

groups,

matchTime,

extraTime,

penalty,

status:"Upcoming",

createdAt:serverTimestamp()

});

status.innerHTML="✅ Tournament Saved Successfully";

clearForm();

setTimeout(()=>{

window.location.href="teams.html";

},1500);

}

catch(error){

console.error(error);

status.innerHTML="❌ Failed to Save Tournament";

}

}

// ==========================
// Clear Form
// ==========================

function clearForm(){

document.getElementById("tournamentName").value="";

document.getElementById("season").value="";

document.getElementById("startDate").value="";

document.getElementById("endDate").value="";

document.getElementById("totalTeams").value="";

document.getElementById("groups").value="";

document.getElementById("matchTime").value="8";

}
