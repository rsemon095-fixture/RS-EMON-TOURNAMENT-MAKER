/* ==========================================
   RS Emon Tournament Maker
   points.js
   Part 1 - Initialization
========================================== */


import { db } from "./firebase.js";


import {
    collection,
    getDocs,
    onSnapshot,
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



/* ==========================================
   Firestore Collection
========================================== */


const teamsRef = collection(db,"teams");

const matchesRef = collection(db,"matches");

const pointsRef = collection(db,"points");



/* ==========================================
   HTML Elements
========================================== */


const tableBody =
document.getElementById("pointTableBody");


const tableCount =
document.getElementById("pointCount");



/* ==========================================
   Global Variable
========================================== */


let standings = [];



/* ==========================================
   Initialize Point Table
========================================== */


window.addEventListener("DOMContentLoaded",()=>{


    console.log(
        "Point Table System Ready"
    );


    generatePointsTable();


});
/* ==========================================
   Generate Point Table
   Part 2 - Calculation Engine
========================================== */


async function generatePointsTable(){


    try{


        const matchesSnapshot =
        await getDocs(matchesRef);



        const teams = {};



        matchesSnapshot.forEach((match)=>{


            const data = match.data();



            // শুধু Finished Match হিসাব হবে

            if(data.status !== "Finished"){

                return;

            }



            const home =
            data.homeTeam;


            const away =
            data.awayTeam;



            // Create Home Team

            if(!teams[home]){


                teams[home] = {


                    team: home,

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




            // Create Away Team

            if(!teams[away]){


                teams[away] = {


                    team: away,

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




            // Played

            teams[home].played++;

            teams[away].played++;




            // Goals

            teams[home].gf += Number(data.homeScore || 0);

            teams[home].ga += Number(data.awayScore || 0);



            teams[away].gf += Number(data.awayScore || 0);

            teams[away].ga += Number(data.homeScore || 0);




            // Result Calculation


            if(data.homeScore > data.awayScore){


                teams[home].win++;

                teams[home].points += 3;


                teams[away].loss++;


            }


            else if(data.homeScore < data.awayScore){


                teams[away].win++;

                teams[away].points += 3;


                teams[home].loss++;


            }


            else{


                teams[home].draw++;

                teams[away].draw++;


                teams[home].points++;

                teams[away].points++;


            }



        });



        // Goal Difference


        Object.values(teams).forEach((team)=>{


            team.gd =
            team.gf - team.ga;


        });



       /* ==========================================
   Ranking Sort System
========================================== */

standings = Object.values(teams).sort((a,b)=>{


    // 1. Points বেশি হলে আগে

    if(b.points !== a.points){

        return b.points - a.points;

    }



    // 2. Points সমান হলে GD বেশি আগে

    if(b.gd !== a.gd){

        return b.gd - a.gd;

    }



    // 3. GD সমান হলে GF বেশি আগে

    if(b.gf !== a.gf){

        return b.gf - a.gf;

    }



    // 4. সব সমান হলে Alphabetical

    return a.team.localeCompare(b.team);


});


        console.log(
            "Calculated Standings",
            standings
        );
await savePointsToFirestore();


    }


    catch(error){


        console.error(error);


        alert(
            "Failed to generate point table"
        );


    }


}
/* ==========================================
   Save Point Table To Firestore
   Part 4
========================================== */


async function savePointsToFirestore(){


    try{


        for(const team of standings){


            await setDoc(

                doc(
                    db,
                    "points",
                    team.team
                ),

                {

                    team: team.team,

                    played: team.played,

                    win: team.win,

                    draw: team.draw,

                    loss: team.loss,

                    gf: team.gf,

                    ga: team.ga,

                    gd: team.gd,

                    points: team.points

                }

            );


        }



        console.log(
            "Point Table Saved Successfully"
        );


    }


    catch(error){


        console.error(error);


        alert(
            "Failed to save points"
        );


    }


}
/* ==========================================
   Display Point Table
   Part 5 - Final
========================================== */


function displayPointTable(){


    if(!tableBody){

        return;

    }


    tableBody.innerHTML = "";



    if(standings.length === 0){


        tableBody.innerHTML = `

        <tr>

            <td colspan="10">

                No Data Available

            </td>

        </tr>

        `;


        return;

    }



    standings.forEach((team,index)=>{


        tableBody.innerHTML += `


        <tr>


            <td>

                ${index + 1}

            </td>


            <td>

                ${team.team}

            </td>


            <td>

                ${team.played}

            </td>


            <td>

                ${team.win}

            </td>


            <td>

                ${team.draw}

            </td>


            <td>

                ${team.loss}

            </td>


            <td>

                ${team.gf}

            </td>


            <td>

                ${team.ga}

            </td>


            <td>

                ${team.gd}

            </td>


            <td>

                ${team.points}

            </td>


        </tr>


        `;


    });



    if(tableCount){


        tableCount.textContent =
        `${standings.length} Teams`;

    }


}



/* ==========================================
   Auto Update Point Table
========================================== */


onSnapshot(matchesRef, async ()=>{


    await generatePointsTable();


    displayPointTable();


});



/* ==========================================
   Initial Load
========================================== */


generatePointsTable()
.then(()=>{


    displayPointTable();


});
