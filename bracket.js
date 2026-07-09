/*=====================================
 RS Emon Tournament Maker
 Knockout Bracket
======================================*/

import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const container = document.getElementById("bracketContainer");

async function loadBracket(){

container.innerHTML="";

const snapshot=await getDocs(collection(db,"fixtures"));

let html="";

snapshot.forEach((match,index)=>{

const data=match.data();

if(data.round==="Knockout"){

html+=`

<div class="bracket-card">

<h3>Match ${index+1}</h3>

<p>

${data.homeTeam}

🆚

${data.awayTeam}

</p>

<h2>

${data.homeScore}

-

${data.awayScore}

</h2>

<p>

Status :

${data.status}

</p>

<p>

Winner :

${data.winner || "-"}

</p>

</div>

`;

}

});

if(html===""){

html="<h3>No Knockout Match Found</h3>";

}

container.innerHTML=html;

}

loadBracket();
