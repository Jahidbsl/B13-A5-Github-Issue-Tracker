document.getElementById("login-btn").addEventListener("click", (event) => {

    // event.preventDefault();

    const inputuserName = document.getElementById("userName");
    const inputloginPass = document.getElementById("loginPass");
    const userName = inputuserName.value;
    const loginPass = inputloginPass.value;
    const defaultUser = "admin";
    const defaultPass = "admin123";

    if (userName === defaultUser && loginPass === defaultPass) {
        alert("Login Successfully");
        sessionStorage.setItem("isLoggedIn", "true");
        window.location.replace("/index.html")

    } else {
        alert("Invaide Password");
        inputloginPass.value = "";
        inputloginPass.focus();
    }
    // console.log(userName)
    // console.log(loginPass)
    // console.log("Button clicked");
    return;
});

