const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const title = document.getElementById("form-title");
const subtitle = document.getElementById("form-subtitle");

function resetForm() {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
}

loginTab.addEventListener("click", () => {
  loginTab.classList.add("active");
  signupTab.classList.remove("active");

  loginForm.style.display = "block";
  signupForm.style.display = "none";

  title.textContent = "Welcome Back!";
  subtitle.textContent = "Enter your details to access your account";

  resetForm();
});

signupTab.addEventListener("click", () => {
  signupTab.classList.add("active");
  loginTab.classList.remove("active");

  signupForm.style.display = "block";
  loginForm.style.display = "none";

  title.textContent = "Join TaskMaster";
  subtitle.textContent = "Create an account to boost your productivity";

  resetForm();
});

//SIGNUP LOGIC

const signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  if (!name || !email || !password) {
    alert("Please fill in all fields");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const user = { name, email, password };
  localStorage.setItem("taskmasterUser", JSON.stringify(user));

  alert("Account created successfully! You can now log in.");
  loginTab.click();
});

//LOGIN LOGIC

const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const savedUser = JSON.parse(localStorage.getItem("taskmasterUser"));

  if (!savedUser) {
    alert("No account found. Please create one.");
    return;
  }

  if (email === savedUser.email && password === savedUser.password) {
    alert("Login successful! Redirecting...");

    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: savedUser.name,
        email: savedUser.email,
        initials: savedUser.name
          .split(" ")
          .map((n) => n[0].join("").toUpperCase()),
      })
    );

    window.location.href = "dashboard.html";
  } else {
    alert("Incorrect email or password.");
  }
});
