/*====================================
RS Emon Tournament Maker
Maintenance Mode
=====================================*/

import { db } from "./firebase.js";

import {

doc,
setDoc,
getDoc

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const maintenanceSwitch =
document.getElementById("maintenanceSwitch");

const statusText =
document.getElementById("statusText");

// Load Status

async function loadStatus(){

const snap =
await getDoc(doc(db,"system","maintenance"));

if(snap.exists()){

const data=snap.data();

maintenanceSwitch.checked=data.enabled;

statusText.innerHTML=data.enabled
? "🟢 Maintenance ON"
: "🔴 Maintenance OFF";

}

}

loadStatus();

// Save Status

maintenanceSwitch.addEventListener("change",async()=>{

await setDoc(doc(db,"system","maintenance"),{

enabled:maintenanceSwitch.checked,

updatedAt:new Date().toLocaleString()

});

statusText.innerHTML=maintenanceSwitch.checked
? "🟢 Maintenance ON"
: "🔴 Maintenance OFF";

alert("Maintenance Updated");

});
