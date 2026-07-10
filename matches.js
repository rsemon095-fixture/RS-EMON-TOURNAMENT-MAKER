/* ==========================================
   RS Emon Tournament Maker
   matches.js
   Part 1 - Initialization
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

/* ==========================================
   Firestore Collections
========================================== */

const teamsRef = collection(db, "teams");

const matchesRef = collection(db, "matches");

/* ==========================================
   HTML Elements
========================================== */

const matchForm = document.getElementById("matchForm");

const homeTeam = document.getElementById("homeTeam");

const awayTeam = document.getElementById("awayTeam");

const matchDate = document.getElementById("matchDate");

const matchTime = document.getElementById("matchTime");

const matchRound = document.getElementById("matchRound");

const matchStatus = document.getElementById("matchStatus");

const addMatchBtn = document.getElementById("addMatch");

const matchList = document.getElementById("matchList");

/* Optional */

const matchCount = document.getElementById("matchCount");

/* ==========================================
   Global Variables
========================================== */

let editMode = false;

let editMatchId = null;

let isSaving = false;

/* ==========================================
   Reset Form
========================================== */

function resetMatchForm() {

    matchForm.reset();

    editMode = false;

    editMatchId = null;

    addMatchBtn.innerHTML = "➕ Add Match";

    homeTeam.focus();

}

/* ==========================================
   Load Teams
========================================== */

async function loadTeams() {

    homeTeam.innerHTML =
        `<option value="">Select Home Team</option>`;

    awayTeam.innerHTML =
        `<option value="">Select Away Team</option>`;

    try {

        const snapshot = await getDocs(teamsRef);

        snapshot.forEach((team) => {

            const data = team.data();

            const option1 = document.createElement("option");

            option1.value = data.teamName;

            option1.textContent = data.teamName;

            const option2 = option1.cloneNode(true);

            homeTeam.appendChild(option1);

            awayTeam.appendChild(option2);

        });

    }

    catch (error) {

        console.error(error);

        alert("Failed to load teams.");

    }

}

/* ==========================================
   Initialize
========================================== */

window.addEventListener("DOMContentLoaded", async () => {

    resetMatchForm();

    await loadTeams();

    console.log("==================================");
    console.log("Match Management Ready");
    console.log("==================================");

});
/* ==========================================
   Match Form Submit
   Part 2
========================================== */

matchForm.addEventListener("submit", async (e) => {

    e.preventDefault();


    const home = homeTeam.value;

    const away = awayTeam.value;

    const date = matchDate.value;

    const time = matchTime.value;

    const round = matchRound.value;

    const status = matchStatus.value;


    /* ==========================
       Validation
    ========================== */


    if (home === "") {

        alert("Please select Home Team.");

        return;

    }


    if (away === "") {

        alert("Please select Away Team.");

        return;

    }


    if (home === away) {

        alert("Home Team and Away Team cannot be same.");

        return;

    }


    if (date === "" || time === "") {

        alert("Please select Match Date and Time.");

        return;

    }


    if (round === "") {

        alert("Please select Match Round.");

        return;

    }



    /* ==========================
       Prevent Double Save
    ========================== */


    if (isSaving) return;


    isSaving = true;


    addMatchBtn.disabled = true;


    addMatchBtn.innerHTML = editMode
        ? "Updating..."
        : "Saving...";



    try {


        const matchData = {


            homeTeam: home,

            awayTeam: away,

            matchDate: date,

            matchTime: time,

            round: round,

            status: status,


            // Default Score

            homeScore: 0,

            awayScore: 0,


            createdAt: serverTimestamp()


        };



        /* ==========================
           Add Match
        ========================== */


        if (!editMode) {


            await addDoc(

                matchesRef,

                matchData

            );


            alert("✅ Match Added Successfully");


        }



        /* ==========================
           Update Match
        ========================== */


        else {


            await updateDoc(

                doc(db,"matches",editMatchId),

                {


                    homeTeam: home,

                    awayTeam: away,

                    matchDate: date,

                    matchTime: time,

                    round: round,

                    status: status


                }

            );


            alert("✅ Match Updated Successfully");


        }



        resetMatchForm();


    }


    catch(error){


        console.error(error);


        alert("❌ Failed to save match.");


    }



    finally{


        isSaving = false;


        addMatchBtn.disabled = false;


        addMatchBtn.innerHTML = editMode

            ? "💾 Update Match"

            : "➕ Add Match";


    }



});
/* ==========================================
   Realtime Match List
   Part 3
========================================== */


onSnapshot(matchesRef, (snapshot) => {


    matchList.innerHTML = "";


    // ==========================
    // Match Count
    // ==========================

    if(matchCount){

        matchCount.textContent =
            `${snapshot.size} Matches`;

    }



    // ==========================
    // Empty State
    // ==========================


    if(snapshot.empty){


        matchList.innerHTML = `

            <div class="empty-team">

                <h3>No Matches Found</h3>

                <p>Create your first tournament match.</p>

            </div>

        `;


        return;


    }



    // ==========================
    // Load Match Cards
    // ==========================


    snapshot.forEach((match)=>{


        const data = match.data();



        const card = document.createElement("div");


        card.className = "match-item";



        card.innerHTML = `


        <div class="match-teams">


            <div class="team-name">

                ${data.homeTeam}

            </div>



            <div class="vs">

                VS

            </div>



            <div class="team-name">

                ${data.awayTeam}

            </div>


        </div>




        <div class="match-details">


            <span>
                📅 ${data.matchDate}
            </span>


            <span>
                🕒 ${data.matchTime}
            </span>


            <span>
                🏆 ${data.round}
            </span>


            <span>
                ${data.status}
            </span>


        </div>





        <div class="match-actions">


            <button

                class="edit-match"

                onclick="editMatch('${match.id}')">

                ✏️ Edit

            </button>



            <button

                class="delete-match"

                onclick="deleteMatch('${match.id}')">

                🗑 Delete

            </button>



        </div>


        `;



        matchList.appendChild(card);



    });



});
/* ==========================================
   Edit Match
   Part 4
========================================== */


window.editMatch = async (id) => {


    try{


        const matchRef = doc(db,"matches",id);


        const snapshot = await getDoc(matchRef);



        if(!snapshot.exists()){


            alert("Match not found.");

            return;


        }



        const data = snapshot.data();



        homeTeam.value = data.homeTeam || "";


        awayTeam.value = data.awayTeam || "";


        matchDate.value = data.matchDate || "";


        matchTime.value = data.matchTime || "";


        matchRound.value = data.round || "";


        matchStatus.value = data.status || "Upcoming";



        editMode = true;


        editMatchId = id;



        addMatchBtn.innerHTML =
            "💾 Update Match";



        window.scrollTo({

            top:0,

            behavior:"smooth"

        });



        homeTeam.focus();



    }


    catch(error){


        console.error(error);


        alert("❌ Failed to load match.");


    }


};




/* ==========================================
   Delete Match
========================================== */


window.deleteMatch = async (id)=>{


    const confirmDelete = confirm(

        "Are you sure you want to delete this match?"

    );



    if(!confirmDelete){

        return;

    }




    try{


        await deleteDoc(

            doc(db,"matches",id)

        );



        if(editMatchId === id){


            resetMatchForm();


        }



        alert("✅ Match Deleted Successfully");



    }


    catch(error){


        console.error(error);


        alert("❌ Failed to delete match.");


    }



};
/* ==========================================
   Match Module Final Utilities
   Part 5
========================================== */


/* ==========================================
   Reload Teams
========================================== */

async function refreshTeams(){

    await loadTeams();

}


/* ==========================================
   Prevent Same Match Duplicate
========================================== */

async function checkDuplicateMatch(
    home,
    away,
    date
){

    let duplicate = false;


    const snapshot = await getDocs(matchesRef);


    snapshot.forEach((match)=>{


        const data = match.data();


        if(

            data.homeTeam === home &&

            data.awayTeam === away &&

            data.matchDate === date &&

            match.id !== editMatchId

        ){

            duplicate = true;

        }


    });


    return duplicate;

}



/* ==========================================
   Form Auto Reset On Page Load
========================================== */


window.addEventListener("load",()=>{


    if(matchForm){

        resetMatchForm();

    }


    console.log(
        "Match Management Module Loaded Successfully"
    );


});



/* ==========================================
   End of matches.js
========================================== */
