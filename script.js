// ==========================================
// RS Emon Tournament Maker
// Firebase Connection Test
// ==========================================

import { db } from "./firebase.js";

import {
  ref,
  set,
  get
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";


// Test Data Save
const testRef = ref(db, "test");

set(testRef, {
  message: "Firebase Connected Successfully",
  time: new Date().toString()
})
.then(() => {
  console.log("Data Saved");
})
.catch((error) => {
  console.log(error);
});


// Test Data Read
get(testRef)
.then((snapshot) => {
  if(snapshot.exists()){
    console.log(snapshot.val());
  }
});
