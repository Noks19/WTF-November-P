const loginTab = document.getElementById("loginTab")
const signupTab = document.getElementById("signupTab")

const loginForm = document.getElementById("login-form")
const signupForm = document.getElementById("signup-form")

const title = document.getElementById("form-title")
const subtitle = document.getElementById("form-subtitle")

loginTab.addEventListener("click", () =>{
    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    loginForm.style.display = "block";
    signupForm.style.display = "none";

    title.textContent = "Welcome Back!";
    subtitle.textContent = "Enter your details to access your account";


    resetForm();
});

signupTab.addEventListener("click",() => {
    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    signupForm.style.display = "block";
    loginForm.style.display = "none";

    title.textContent = "Join TaskMaster";
    subtitle.textContent = "Create an account to boost your productivity";

    resetForm();
})

