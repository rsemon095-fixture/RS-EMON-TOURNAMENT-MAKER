//====================================
// RS Emon Tournament Maker
// Admin Login
//====================================

const ADMIN_EMAIL = "admin@rsemon.com";

const ADMIN_PASSWORD = "123456";

function loginAdmin(){

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

if(email===ADMIN_EMAIL &&
password===ADMIN_PASSWORD){

localStorage.setItem("admin","true");

window.location.href="dashboard.html";

}

else{

document.getElementById("loginStatus").innerHTML="❌ Wrong Email or Password";

}

}
