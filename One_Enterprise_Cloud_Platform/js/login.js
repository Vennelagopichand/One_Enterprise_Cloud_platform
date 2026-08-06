const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (
        username === "admin" &&
        password === "admin123"
    ) {

        message.style.color = "green";

        message.innerText = "Login Successful";

        setTimeout(() => {

            window.location.href = "dashboard.html";

        }, 1000);

    } else {

        message.style.color = "red";

        message.innerText = "Invalid Credentials";
    }
});