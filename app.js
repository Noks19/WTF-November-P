const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

const title = document.getElementById("form-title");
const subtitle = document.getElementById("form-subtitle");

// Add validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateName(name) {
  return name.trim().length >= 2;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const errorElement =
    formGroup.querySelector(".error-message") || document.createElement("div");

  if (!formGroup.querySelector(".error-message")) {
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.style.fontSize = "12px";
    errorElement.style.marginTop = "5px";
    formGroup.appendChild(errorElement);
  }

  errorElement.textContent = message;
  input.style.borderColor = "red";
}

function clearError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }
  input.style.borderColor = "";
}

function validateLoginForm() {
  let isValid = true;

  const email = loginForm.querySelector('input[type="email"]');
  const password = loginForm.querySelector('input[type="password"]');

  // Clear previous errors
  clearError(email);
  clearError(password);

  // Validate email
  if (!email.value.trim()) {
    showError(email, "Email is required");
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (!password.value) {
    showError(password, "Password is required");
    isValid = false;
  } else if (!validatePassword(password.value)) {
    showError(password, "Password must be at least 6 characters long");
    isValid = false;
  }

  return isValid;
}

function validateSignupForm() {
  let isValid = true;

  const fullName = signupForm.querySelector('input[type="text"]');
  const email = signupForm.querySelector('input[type="email"]');
  const password = signupForm.querySelector('input[type="password"]');
  const confirmPassword = signupForm.querySelectorAll(
    'input[type="password"]'
  )[1];

  // Clear previous errors
  clearError(fullName);
  clearError(email);
  clearError(password);
  clearError(confirmPassword);

  // Validate full name
  if (!fullName.value.trim()) {
    showError(fullName, "Full name is required");
    isValid = false;
  } else if (!validateName(fullName.value.trim())) {
    showError(fullName, "Name must be at least 2 characters long");
    isValid = false;
  }

  // Validate email
  if (!email.value.trim()) {
    showError(email, "Email is required");
    isValid = false;
  } else if (!validateEmail(email.value.trim())) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  // Validate password
  if (!password.value) {
    showError(password, "Password is required");
    isValid = false;
  } else if (!validatePassword(password.value)) {
    showError(password, "Password must be at least 6 characters long");
    isValid = false;
  }

  // Validate confirm password
  if (!confirmPassword.value) {
    showError(confirmPassword, "Please confirm your password");
    isValid = false;
  } else if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Passwords do not match");
    isValid = false;
  }

  return isValid;
}

// Add real-time validation
function addRealTimeValidation() {
  // Login form real-time validation
  const loginEmail = loginForm.querySelector('input[type="email"]');
  const loginPassword = loginForm.querySelector('input[type="password"]');

  if (loginEmail) {
    loginEmail.addEventListener("blur", function () {
      if (this.value.trim() && !validateEmail(this.value.trim())) {
        showError(this, "Please enter a valid email address");
      } else {
        clearError(this);
      }
    });
  }

  if (loginPassword) {
    loginPassword.addEventListener("blur", function () {
      if (this.value && !validatePassword(this.value)) {
        showError(this, "Password must be at least 6 characters long");
      } else {
        clearError(this);
      }
    });
  }

  // Signup form real-time validation
  const signupName = signupForm.querySelector('input[type="text"]');
  const signupEmail = signupForm.querySelector('input[type="email"]');
  const signupPassword = signupForm.querySelector('input[type="password"]');
  const signupConfirmPassword = signupForm.querySelectorAll(
    'input[type="password"]'
  )[1];

  if (signupName) {
    signupName.addEventListener("blur", function () {
      if (this.value.trim() && !validateName(this.value.trim())) {
        showError(this, "Name must be at least 2 characters long");
      } else {
        clearError(this);
      }
    });
  }

  if (signupEmail) {
    signupEmail.addEventListener("blur", function () {
      if (this.value.trim() && !validateEmail(this.value.trim())) {
        showError(this, "Please enter a valid email address");
      } else {
        clearError(this);
      }
    });
  }

  if (signupPassword) {
    signupPassword.addEventListener("blur", function () {
      if (this.value && !validatePassword(this.value)) {
        showError(this, "Password must be at least 6 characters long");
      } else {
        clearError(this);
      }
    });
  }

  if (signupConfirmPassword) {
    signupConfirmPassword.addEventListener("blur", function () {
      const password = signupPassword.value;
      if (this.value && password !== this.value) {
        showError(this, "Passwords do not match");
      } else {
        clearError(this);
      }
    });
  }
}

// Add form submission handlers
function setupFormSubmission() {
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateLoginForm()) {
        // Form is valid, proceed with login
        alert("Login successful!");
        // Here you would typically send data to your backend
        // loginForm.submit();
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (validateSignupForm()) {
        // Form is valid, proceed with signup
        alert("Account created successfully!");
        // Here you would typically send data to your backend
        // signupForm.submit();
      }
    });
  }
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

// Initialize validation when the page loads
document.addEventListener("DOMContentLoaded", function () {
  addRealTimeValidation();
  setupFormSubmission();
});

// Enhanced resetForm function to also clear errors
function resetForm() {
  // Clear all form inputs
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
    clearError(input);
  });
}
