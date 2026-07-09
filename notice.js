/*=====================================
RS Emon Tournament Maker
Notice System
======================================*/

import { db } from "./firebase.js";

import {

doc,
setDoc,
getDoc

} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const publishBtn =
document.getElementById("publishNotice");

const noticeInput =
document.getElementById("noticeText");

const noticeBoard =
document.getElementById("noticeBoard");

// ======================
// Publish Notice
// ======================

publishBtn.addEventListener("click", publishNotice);

async function publishNotice(){

const notice =
noticeInput.value.trim();

if(notice==""){

alert("Write Notice");

return;

}

await setDoc(doc(db,"system","notice"),{

text:notice,

date:new Date().toLocaleString()

});

alert("Notice Published");

noticeInput.value="";

loadNotice();

}

// ======================
// Load Notice
// ======================

async function loadNotice(){

const snap =
await getDoc(doc(db,"system","notice"));

if(snap.exists()){

const data=snap.data();

noticeBoard.innerHTML=`

<div class="notice-card">

<h3>📢 Latest Notice</h3>

<p>${data.text}</p>

<small>${data.date}</small>

</div>

`;

}

}

loadNotice();
