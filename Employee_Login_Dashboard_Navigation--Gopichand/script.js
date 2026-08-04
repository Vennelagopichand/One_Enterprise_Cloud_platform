const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let error = document.getElementById("error-message");

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("employeeName", "Admin");

        window.location.href = "dashboard.html";

    } else {

        error.innerText = "Invalid Credentials";
    }

});