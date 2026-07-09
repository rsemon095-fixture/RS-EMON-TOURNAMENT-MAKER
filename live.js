/*=========================================
 RS Emon Tournament Maker
 live.js
=========================================*/

import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

// =======================
// Elements
// =======================

const matchSelect = document.getElementById("matchSelect");
const updateBtn = document.getElementById("updateScore");
const message = document.getElementById("liveMessage");

// =======================
// Load Matches
// =======================

async function loadMatches(){

matchSelect.innerHTML="";

const snapshot = await getDocs(collection(db,"fixtures"));

snapshot.forEach((item)=>{

const data = item.data();

matchSelect.innerHTML += `

<option value="${item.id}">

${data.homeTeam} VS ${data.awayTeam}

</option>

`;

});

}

loadMatches();

// =======================
// Update Score
// =======================

updateBtn.addEventListener("click",updateScore);

async function updateScore(){

const id = matchSelect.value;

const homeScore =
parseInt(document.getElementById("homeScore").value);

const awayScore =
parseInt(document.getElementById("awayScore").value);

const status =
document.getElementById("matchStatus").value;

let winner="Draw";

if(homeScore>awayScore){

winner="Home";

}

else if(awayScore>homeScore){

winner="Away";

}

try{

await updateDoc(doc(db,"fixtures",id),{

homeScore,

awayScore,

status,

winner

});

message.innerHTML="✅ Live Score Updated";

}
catch(error){

console.log(error);

message.innerHTML="❌ Update Failed";

}

}
