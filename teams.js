/*=========================================
 RS Emon Tournament Maker
 teams.js
=========================================*/

import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const addBtn = document.getElementById("addTeam");
const teamList = document.getElementById("teamList");

addBtn.addEventListener("click", addTeam);

// ===========================
// Add Team
// ===========================

async function addTeam(){

const teamName =
document.getElementById("teamName").value.trim();

const managerName =
document.getElementById("managerName").value.trim();

const teamLogo =
document.getElementById("teamLogo").value.trim();

if(teamName===""){

alert("Enter Team Name");

return;

}

try{

await addDoc(collection(db,"teams"),{

teamName,

managerName,

teamLogo,

createdAt:serverTimestamp()

});

document.getElementById("teamName").value="";
document.getElementById("managerName").value="";
document.getElementById("teamLogo").value="";

loadTeams();

alert("Team Added Successfully");

}

catch(error){

console.log(error);

alert("Failed");

}

}

// ===========================
// Load Teams
// ===========================

async function loadTeams(){

teamList.innerHTML="Loading...";

const snapshot =
await getDocs(collection(db,"teams"));

teamList.innerHTML="";

snapshot.forEach((team)=>{

const data = team.data();

teamList.innerHTML += `

<div class="team-card">

<img src="${
data.teamLogo || "assets/default-team.png"
}" class="team-logo">

<div class="team-info">

<h3>${data.teamName}</h3>

<p>${data.managerName}</p>

</div>

<button
class="delete-btn"
onclick="deleteTeam('${team.id}')">

Delete

</button>

</div>

`;

});

}

loadTeams();

// ===========================
// Delete Team
// ===========================

window.deleteTeam = async(id)=>{

if(confirm("Delete Team?")){

await deleteDoc(doc(db,"teams",id));

loadTeams();

}

};
