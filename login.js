// ==========================================
// RS Emon Tournament
// Admin Login
// Part 1
// ==========================================

// Firebase Config Import
import { app } from "./firebase.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// ==========================================
// Firebase Auth
// ==========================================

const auth = getAuth(app);

// ==========================================
// HTML Elements
// ==========================================

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const loginBtn = document.getElementById("loginBtn");

const errorMsg = document.getElementById("errorMsg");

const successMsg = document.getElementById("successMsg");

// ==========================================
// Hide Messages
// ==========================================

function hideMessages(){

    if(errorMsg){
        errorMsg.style.display = "none";
    }

    if(successMsg){
        successMsg.style.display = "none";
    }

}

// ==========================================
// Show Error
// ==========================================

function showError(message){

    hideMessages();

    errorMsg.innerText = message;

    errorMsg.style.display = "block";

}

// ==========================================
// Show Success
// ==========================================

function showSuccess(message){

    hideMessages();

    successMsg.innerText = message;

    successMsg.style.display = "block";

}
// ==========================================
// Login Function
// Part 2
// ==========================================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    hideMessages();

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (userEmail === "" || userPassword === "") {
        showError("Please enter email and password.");
        return;
    }

    loginBtn.disabled = true;
    loginBtn.classList.add("loading");
    loginBtn.innerText = "Logging In";

    try {

        await signInWithEmailAndPassword(
            auth,
            userEmail,
            userPassword
        );

        showSuccess("Login Successful!");

        setTimeout(() => {
            window.location.href = "admin.html";
        }, 1000);

    } catch (error) {

        let message = "Login Failed!";

        switch (error.code) {

            case "auth/invalid-email":
                message = "Invalid email address.";
                break;

            case "auth/invalid-credential":
                message = "Email or password is incorrect.";
                break;

            case "auth/user-disabled":
                message = "This account has been disabled.";
                break;

            case "auth/too-many-requests":
                message = "Too many attempts. Try again later.";
                break;

            case "auth/network-request-failed":
                message = "Network error. Check your internet.";
                break;
        }

        showError(message);

    } finally {

        loginBtn.disabled = false;
        loginBtn.classList.remove("loading");
        loginBtn.innerText = "Login";

    }

});
// ==========================================
// RS Emon Tournament
// Admin Login
// Part 3 (Final)
// ==========================================

// Already Logged In
onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Admin Logged In");

        window.location.href = "admin.html";

    }

});

// ==========================================
// Auto Focus
// ==========================================

window.addEventListener("load", () => {

    if (email) {
        email.focus();
    }

});

// ==========================================
// Enter Key Support
// ==========================================

password.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        loginForm.requestSubmit();

    }

});

// ==========================================
// Clear Error While Typing
// ==========================================

email.addEventListener("input", hideMessages);

password.addEventListener("input", hideMessages);

// ==========================================
// Console
// ==========================================

console.log("Login Page Loaded Successfully");

// ==========================================
// End of login.js
// ==========================================
