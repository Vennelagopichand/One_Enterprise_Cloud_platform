const form = document.getElementById("registerForm");

const message = document.getElementById("message");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        message.style.color = "red";

        message.innerText =
            "Passwords do not match!";

        return;
    }

    message.style.color = "green";

    message.innerText =
        "Registration Successful!";

    form.reset();
});