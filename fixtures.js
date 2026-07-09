/*==================================
RS Emon Tournament Maker
Fixture Generator
===================================*/

import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const btn = document.getElementById("generateFixture");
const fixtureList = document.getElementById("fixtureList");

btn.addEventListener("click", generateFixture);

async function generateFixture(){

fixtureList.innerHTML="Generating Fixture...";

const teamsSnapshot =
await getDocs(collection(db,"teams"));

const teams=[];

teamsSnapshot.forEach(doc=>{

teams.push({

id:doc.id,

...doc.data()

});

});

if(teams.length<2){

fixtureList.innerHTML="Minimum 2 Teams Required";

return;

}

fixtureList.innerHTML="";

for(let i=0;i<teams.length;i++){

for(let j=i+1;j<teams.length;j++){

const home = teams[i];

const away = teams[j];

// Duplicate Check
const already = await fixtureExists(home.teamName, away.teamName);

if (already) {
    continue;
}

await addDoc(collection(db,"fixtures"),{

    homeTeam:home.teamName,

    awayTeam:away.teamName,

    homeScore:0,

    awayScore:0,

    status:"Upcoming",

    matchDate:"",

    matchTime:"",

    winner:"",

    round:"League"

});

fixtureList.innerHTML += `

<div class="fixture-card">

<h3>

${home.teamName}

VS

${away.teamName}

</h3>

<p>Upcoming Match</p>

</div>

`;

}

}

alert("Fixture Generated Successfully");

}
/*==================================
 Fixture Part-2
===================================*/

// ============================
// Load Fixtures
// ============================

async function loadFixtures() {

    fixtureList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "fixtures"));

    let matchNo = 1;

    snapshot.forEach((doc) => {

        const data = doc.data();

        fixtureList.innerHTML += `

        <div class="fixture-card">

            <h3>Match ${matchNo}</h3>

            <h2>${data.homeTeam} 🆚 ${data.awayTeam}</h2>

            <p>Status : ${data.status}</p>

            <p>Score : ${data.homeScore} - ${data.awayScore}</p>

        </div>

        `;

        matchNo++;

    });

}

loadFixtures();

// ============================
// Check Duplicate Fixture
// ============================

async function fixtureExists(home, away) {

    const snapshot = await getDocs(collection(db, "fixtures"));

    let found = false;

    snapshot.forEach((doc) => {

        const data = doc.data();

        if (

            (data.homeTeam === home && data.awayTeam === away) ||

            (data.homeTeam === away && data.awayTeam === home)

        ) {

            found = true;

        }

    });

    return found;

}
