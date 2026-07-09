/*=========================================
 RS Emon Tournament Maker
 points.js
=========================================*/

import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const tableBody = document.getElementById("pointsTable");

// =======================
// Generate Point Table
// =======================

async function generatePointsTable(){

const fixtures = await getDocs(collection(db,"fixtures"));

const teams = {};

fixtures.forEach((match)=>{

const data = match.data();

if(data.status !== "Finished") return;

const home = data.homeTeam;
const away = data.awayTeam;

if(!teams[home]){

teams[home]={
team:home,
played:0,
win:0,
draw:0,
loss:0,
gf:0,
ga:0,
gd:0,
points:0
};

}

if(!teams[away]){

teams[away]={
team:away,
played:0,
win:0,
draw:0,
loss:0,
gf:0,
ga:0,
gd:0,
points:0
};

}

teams[home].played++;
teams[away].played++;

teams[home].gf += data.homeScore;
teams[home].ga += data.awayScore;

teams[away].gf += data.awayScore;
teams[away].ga += data.homeScore;

// Winner

if(data.homeScore > data.awayScore){

teams[home].win++;
teams[home].points +=3;

teams[away].loss++;

}

else if(data.homeScore < data.awayScore){

teams[away].win++;
teams[away].points +=3;

teams[home].loss++;

}

else{

teams[home].draw++;
teams[away].draw++;

teams[home].points++;
teams[away].points++;

}

});

Object.values(teams).forEach(team=>{

team.gd = team.gf - team.ga;

});

// Sort by Points then Goal Difference

const standings = Object.values(teams).sort((a,b)=>{

if(b.points===a.points){

return b.gd-a.gd;

}

return b.points-a.points;

});

// Save Firestore

for(const team of standings){

await setDoc(doc(db,"points",team.team),team);

}

// Show Table

if(tableBody){

tableBody.innerHTML="";

standings.forEach((team,index)=>{

tableBody.innerHTML +=`

<tr>

<td>${index+1}</td>

<td>${team.team}</td>

<td>${team.played}</td>

<td>${team.win}</td>

<td>${team.draw}</td>

<td>${team.loss}</td>

<td>${team.gf}</td>

<td>${team.ga}</td>

<td>${team.gd}</td>

<td>${team.points}</td>

</tr>

`;

});

}

}

generatePointsTable();
