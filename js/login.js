document.getElementById("login-btn").addEventListener("click", (event) => {

    // event.preventDefault();

    const userName = document.getElementById("userName").value;
    const loginPass = document.getElementById("loginPass").value;

    const defaultUser = "admin";
    const defaultPass = "admin123";

    if (userName === defaultUser && loginPass === defaultPass) {
        alert("Login Successfully");
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.replace("/index.html")

    } else {
        alert("Invaide");
    }
    // console.log(userName)
    // console.log(loginPass)
    // console.log("Button clicked");
    return;
});

