/* ==========================================
   RS Emon Tournament Maker
   result.js
   Part 1 - Initialization
========================================== */


import { db } from "./firebase.js";


import {
    collection,
    doc,
    updateDoc,
    getDocs,
    getDoc,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";



/* ==========================================
   Firestore Reference
========================================== */


const matchesRef = collection(db,"matches");



/* ==========================================
   HTML Elements
========================================== */


const resultForm =
document.getElementById("resultForm");


const resultMatch =
document.getElementById("resultMatch");


const homeScore =
document.getElementById("homeScore");


const awayScore =
document.getElementById("awayScore");


const updateResult =
document.getElementById("updateResult");


const resultList =
document.getElementById("resultList");



/* ==========================================
   Global Variables
========================================== */


let selectedMatchId = null;


let isUpdating = false;



/* ==========================================
   Load Matches For Result
========================================== */


async function loadResultMatches(){


    resultMatch.innerHTML = `

        <option value="">

            Select Match

        </option>

    `;



    try{


        const snapshot =
        await getDocs(matchesRef);



        snapshot.forEach((match)=>{


            const data = match.data();



            const option =
            document.createElement("option");



            option.value = match.id;



            option.textContent =

            `${data.homeTeam} VS ${data.awayTeam}
             (${data.matchDate})`;



            resultMatch.appendChild(option);



        });



    }


    catch(error){


        console.error(error);


        alert("Failed to load matches.");

    }


}



/* ==========================================
   Initialize
========================================== */


window.addEventListener("DOMContentLoaded",()=>{


    loadResultMatches();


    console.log(
        "Result Management Ready"
    );


});
/* ==========================================
   Update Match Result
   Part 2
========================================== */


resultForm.addEventListener("submit", async (e)=>{


    e.preventDefault();



    const matchId = resultMatch.value;


    const homeGoals = Number(homeScore.value);


    const awayGoals = Number(awayScore.value);



    /* ==========================
       Validation
    ========================== */


    if(matchId === ""){


        alert("Please select a match.");

        return;


    }



    if(homeGoals < 0 || awayGoals < 0){


        alert("Score cannot be negative.");

        return;


    }



    if(isUpdating) return;



    isUpdating = true;



    updateResult.disabled = true;


    updateResult.innerHTML =
    "Updating...";



    try{


        const matchRef =
        doc(db,"matches",matchId);



        const matchSnap =
        await getDoc(matchRef);



        if(!matchSnap.exists()){


            alert("Match not found.");

            return;


        }



        const data =
        matchSnap.data();



        /* ==========================
           Winner Calculation
        ========================== */


        let winner = "Draw";



        if(homeGoals > awayGoals){


            winner = data.homeTeam;


        }

        else if(awayGoals > homeGoals){


            winner = data.awayTeam;


        }



        /* ==========================
           Update Firestore
        ========================== */


        await updateDoc(

            matchRef,

            {


                homeScore: homeGoals,


                awayScore: awayGoals,


                winner: winner,


                status:"Finished",


                resultUpdatedAt:
                serverTimestamp()


            }

        );



        alert("🏆 Result Updated Successfully");



        resultForm.reset();



    }


    catch(error){


        console.error(error);


        alert("❌ Failed to update result.");

    }



    finally{


        isUpdating = false;



        updateResult.disabled = false;



        updateResult.innerHTML =
        "🏆 Update Result";


    }



});
/* ==========================================
   Realtime Result List
   Part 3
========================================== */


onSnapshot(matchesRef, (snapshot)=>{


    resultList.innerHTML = "";



    let hasResult = false;



    snapshot.forEach((match)=>{


        const data = match.data();



        // শুধুমাত্র Finished Match দেখাবে

        if(data.status !== "Finished"){

            return;

        }



        hasResult = true;



        const card =
        document.createElement("div");



        card.className =
        "result-item";



        let winnerClass = "";



        if(data.winner === "Draw"){


            winnerClass = "draw";


        }

        else{


            winnerClass = "winner";


        }



        card.innerHTML = `


        <div class="score-board">


            <div class="result-team">

                ${data.homeTeam}

            </div>



            <div class="score">

                ${data.homeScore}

                -

                ${data.awayScore}

            </div>



            <div class="result-team">

                ${data.awayTeam}

            </div>


        </div>




        <div class="result-info">


            <span>

                📅 ${data.matchDate}

            </span>



            <span>

                🏆 ${data.round}

            </span>



            <span class="${winnerClass}">

                Winner: ${data.winner}

            </span>



            <span class="result-status">

                Finished

            </span>



        </div>



        `;



        resultList.appendChild(card);



    });



    // ==========================
    // Empty Result
    // ==========================


    if(!hasResult){


        resultList.innerHTML = `


        <div class="empty-result">


            <h3>No Results Found</h3>


            <p>

            Update match score to see results.

            </p>


        </div>


        `;


    }



});
/* ==========================================
   Edit Result
   Part 4
========================================== */


window.editResult = async (id)=>{


    try{


        const matchRef =
        doc(db,"matches",id);



        const snapshot =
        await getDoc(matchRef);



        if(!snapshot.exists()){


            alert("Match not found.");

            return;


        }



        const data =
        snapshot.data();



        resultMatch.value = id;



        homeScore.value =
        data.homeScore || 0;



        awayScore.value =
        data.awayScore || 0;



        selectedMatchId = id;



        updateResult.innerHTML =
        "💾 Update Result";



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });



    }


    catch(error){


        console.error(error);


        alert("Failed to load result.");

    }



};




/* ==========================================
   Reset Result
========================================== */


window.resetResult = async (id)=>{


    const confirmReset = confirm(

        "Reset this match result?"

    );



    if(!confirmReset){

        return;

    }




    try{


        await updateDoc(

            doc(db,"matches",id),

            {


                homeScore:0,


                awayScore:0,


                winner:"",


                status:"Upcoming"


            }

        );



        alert("✅ Result Reset Successfully");



    }


    catch(error){


        console.error(error);


        alert("❌ Failed to reset result.");

    }



};
/* ==========================================
   Result Module Final Update
   Part 5
========================================== */


/* ==========================================
   Add Action Buttons To Result Card
========================================== */


/*
   Note:
   Part 3 এর result card এর ভিতরে
   result-actions div যোগ করতে হবে।
*/


/* ==========================================
   Result Module Ready
========================================== */


window.addEventListener("load",()=>{


    console.log("==============================");

    console.log(
        "RS Emon Tournament Result System Ready"
    );

    console.log("==============================");


});



/* ==========================================
   Clear Selected Match
========================================== */


function clearResultForm(){


    resultForm.reset();


    selectedMatchId = null;


    updateResult.innerHTML =
    "🏆 Update Result";


}



/* ==========================================
   Auto Refresh Match Dropdown
========================================== */


setInterval(()=>{


    loadResultMatches();


},30000);



/* ==========================================
   End result.js
========================================== */
