import { db } from "./firebase.js";

import {

collection,

getDocs

}

from

"https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

async function loadDashboard(){

const tournament=

await getDocs(collection(db,"tournaments"));

document.getElementById("totalTournament").innerHTML=tournament.size;

}

loadDashboard();

document.getElementById("logout")

.onclick=()=>{

localStorage.removeItem("admin");

location.href="admin.html";

};
