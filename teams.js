/* ==========================================
   RS Emon Tournament Maker
   teams.js
   Part 1
========================================== */

import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    onSnapshot,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

/* ==========================================
   Collection Reference
========================================== */

const teamsRef = collection(db, "teams");

/* ==========================================
   HTML Elements
========================================== */

const teamForm = document.getElementById("teamForm");

const teamName = document.getElementById("teamName");

const managerName = document.getElementById("managerName");

const teamLogo = document.getElementById("teamLogo");

const teamGroup = document.getElementById("teamGroup");

const addTeamBtn = document.getElementById("addTeam");

const teamList = document.getElementById("teamList");

/* ==========================================
   Global Variables
========================================== */

let editMode = false;

let editTeamId = null;

/* ==========================================
   Reset Form
========================================== */

function resetForm() {

    teamForm.reset();

    editMode = false;

    editTeamId = null;

    addTeamBtn.innerHTML = "➕ Add Team";
// Default Logo

const finalLogo = logo === ""
    ? "assets/default-team.png"
    : logo;
}

/* ==========================================
   Initialize
========================================== */

window.addEventListener("DOMContentLoaded", () => {
console.log("Team Management Ready");
    resetForm();

    console.log("Teams Module Loaded");

});
/* ==========================================
   Team Form Submit
   Part 2
========================================== */

teamForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const team = teamName.value.trim();
    const manager = managerName.value.trim();
    const logo = teamLogo.value.trim();
    const group = teamGroup.value;

    // ==========================
    // Validation
    // ==========================

    if (team === "") {
        alert("Please enter Team Name.");
        teamName.focus();
        return;
    }

    if (manager === "") {
        alert("Please enter Manager Name.");
        managerName.focus();
        return;
    }

    if (group === "") {
        alert("Please select a Group.");
        teamGroup.focus();
        return;
    }

    // ==========================
    // Disable Button
    // ==========================

    addTeamBtn.disabled = true;
    addTeamBtn.textContent = editMode
        ? "Updating..."
        : "Saving...";

    try {

        const teamData = {

            teamName: team,
            managerName: manager,
            teamLogo: logo,
            teamGroup: group,
            createdAt: serverTimestamp()

        };

        // ==========================
        // Add New Team
        // ==========================

        if (!editMode) {

            await addDoc(teamsRef, teamData);

            alert("✅ Team Added Successfully");

        }

        // ==========================
        // Update Team
        // ==========================

        else {

            await updateDoc(
                doc(db, "teams", editTeamId),
                {
                    teamName: team,
                    managerName: manager,
                    teamLogo: logo,
                    teamGroup: group
                }
            );

            alert("✅ Team Updated Successfully");

        }

        resetForm();

    }

    catch (error) {

        console.error(error);

        alert("❌ Failed to save team.");

    }

    finally {

        addTeamBtn.disabled = false;

        addTeamBtn.innerHTML = editMode
            ? "💾 Update Team"
            : "➕ Add Team";

    }

});
/* ==========================================
   Realtime Team List
   Part 3
========================================== */
/* ==========================================
   Team Counter
========================================== */

const teamCount = snapshot.size;

/* ==========================================
   Team Count (Optional)
========================================== */

const counter = document.getElementById("teamCount");

if (counter) {

    counter.textContent = `${teamCount} Teams`;

}
onSnapshot(teamsRef, (snapshot) => {

    teamList.innerHTML = "";

    // ==========================
    // Empty State
    // ==========================

    if (snapshot.empty) {

        teamList.innerHTML = `
            <div class="empty-team">
                <h3>No Teams Found</h3>
                <p>Add your first team to start the tournament.</p>
            </div>
        `;

        return;
    }

    // ==========================
    // Team Cards
    // ==========================

    snapshot.forEach((team) => {

        const data = team.data();

        const card = document.createElement("div");

        card.className = "team-item";

        card.innerHTML = `

            <div class="team-left">

                <img
                    class="team-logo"
                    src="${data.teamLogo || "assets/default-team.png"}"
                    alt="${data.teamName}"
                    onerror="this.src='assets/default-team.png'"
                >

                <div class="team-info">

                    <h3>${data.teamName}</h3>

                    <p>👤 ${data.managerName}</p>

                    <p>🏆 Group ${data.teamGroup}</p>

                </div>

            </div>

            <div class="team-actions">

                <button
                    class="edit-btn"
                    onclick="editTeam('${team.id}')">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteTeam('${team.id}')">
                    Delete
                </button>

            </div>

        `;

        teamList.appendChild(card);

    });

});
/* ==========================================
   Edit Team
   Part 4
========================================== */

window.editTeam = async (id) => {

    try {

        const teamElement = document.querySelector(
            `[onclick="editTeam('${id}')"]`
        ).closest(".team-item");

        teamName.value =
            teamElement.querySelector(".team-info h3").textContent;

        const info =
            teamElement.querySelectorAll(".team-info p");

        managerName.value =
            info[0].textContent.replace("👤 ", "");

        teamGroup.value =
            info[1].textContent.replace("🏆 Group ", "");
teamLogo: finalLogo,
        teamLogo.value =
            teamElement.querySelector(".team-logo").src;

        editMode = true;

        editTeamId = id;

        addTeamBtn.innerHTML = "💾 Update Team";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    catch (error) {

        console.error(error);

        alert("Failed to load team.");

    }

};

/* ==========================================
   Delete Team
========================================== */

window.deleteTeam = async (id) => {

    const confirmDelete = confirm(
        "Are you sure you want to delete this team?"
    );

    if (!confirmDelete) return;

    try {

        await deleteDoc(
            doc(db, "teams", id)
        );

        if (editTeamId === id) {
            resetForm();
        }
teamName.focus();
        alert("✅ Team Deleted Successfully");

    }

    catch (error) {

        console.error(error);

        alert("❌ Failed to delete team.");

    }

};
/* ==========================================
   Edit Team (Firestore Version)
   Part 5
========================================== */

window.editTeam = async (id) => {

    try {

        const teamRef = doc(db, "teams", id);

        const snapshot = await getDoc(teamRef);

        if (!snapshot.exists()) {

            alert("Team not found.");

            return;

        }

        const data = snapshot.data();

        teamName.value = data.teamName || "";

        managerName.value = data.managerName || "";

        teamLogo.value = data.teamLogo || "";

        teamGroup.value = data.teamGroup || "";

        editMode = true;

        editTeamId = id;

        addTeamBtn.innerHTML = "💾 Update Team";

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

    catch (error) {

        console.error(error);

        alert("Failed to load team.");

    }

};
