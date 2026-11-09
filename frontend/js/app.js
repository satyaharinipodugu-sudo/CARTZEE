
// ==========================================
// CARTZEE - AUTHENTICATION JAVASCRIPT
// DEMO MODE
// ==========================================


// 1. GET HTML ELEMENTS

const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");

const form = document.getElementById("auth-form");

const nameGroup = document.getElementById("name-group");
const mobileGroup = document.getElementById("mobile-group");
const confirmGroup = document.getElementById("confirm-group");

const loginOptions = document.getElementById("login-options");

const formTitle = document.getElementById("form-title");
const formDescription = document.getElementById("form-description");

const submitBtn = document.getElementById("submit-btn");
const formMessage = document.getElementById("form-message");

let isSignup = false;


// ==========================================
// 2. LOGIN AND SIGNUP TAB SWITCHING
// ==========================================

function switchTab(signup) {

    isSignup = signup;

    // Active tab design
    loginTab.classList.toggle("active", !signup);
    signupTab.classList.toggle("active", signup);

    // Show and hide registration fields
    nameGroup.hidden = !signup;
    mobileGroup.hidden = !signup;
    confirmGroup.hidden = !signup;

    // Hide login options during signup
    loginOptions.hidden = signup;
    loginOptions.style.display = signup ? "none" : "flex";

    // Required fields
    document.getElementById("name").required = signup;
    document.getElementById("mobile").required = signup;
    document.getElementById("confirm-password").required = signup;

    // Change heading
    formTitle.textContent = signup
        ? "Create Account"
        : "Welcome Back!";

    formDescription.textContent = signup
        ? "Join CARTZEE and discover a smarter shopping experience."
        : "Sign in to continue your shopping journey.";

    // Change button text
    submitBtn.textContent = signup
        ? "Create My Account →"
        : "Login to CARTZEE →";

    // Clear messages
    formMessage.textContent = "";

    // Clear previous validation state
    formMessage.style.color = "#f7dfa7";
}


// ==========================================
// 3. TAB CLICK EVENTS
// ==========================================

loginTab.addEventListener("click", function() {
    switchTab(false);
});

signupTab.addEventListener("click", function() {
    switchTab(true);
});


// ==========================================
// 4. PASSWORD SHOW / HIDE
// ==========================================

document.querySelectorAll(".toggle-password").forEach(button => {

    button.addEventListener("click", function() {

        const target = document.getElementById(
            this.dataset.target
        );

        const isPassword = target.type === "password";

        target.type = isPassword ? "text" : "password";

        this.innerHTML = isPassword

            ? `<svg viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2">
                 <path d="M3 3l18 18"/>
                 <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/>
                 <path d="M9.9 5.2A10.5 10.5 0 0 1 12 5c6.4 0 10 7 10 7"/>
                 <path d="M6.2 6.2C3.5 8 2 12 2 12s3.6 7 10 7"/>
               </svg>`

            : `<svg viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2">
                 <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/>
                 <circle cx="12" cy="12" r="3"/>
               </svg>`;

        this.setAttribute(
            "aria-label",
            isPassword ? "Hide password" : "Show password"
        );

    });

});


// ==========================================
// 5. FORM SUBMISSION
// ==========================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    formMessage.textContent = "";

    const name = document.getElementById("name").value.trim();

    const mobile = document.getElementById("mobile").value.trim();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirm-password").value;


    // ======================================
    // SIGNUP VALIDATION
    // ======================================

    if (isSignup) {

        if (name.length < 2) {

            formMessage.textContent =
                "Please enter your full name.";

            return;
        }

        if (!/^[6-9][0-9]{9}$/.test(mobile)) {

            formMessage.textContent =
                "Enter a valid 10-digit Indian mobile number.";

            return;
        }

        if (email === "") {

            formMessage.textContent =
                "Please enter your email address.";

            return;
        }

        if (password.length < 8) {

            formMessage.textContent =
                "Password must contain at least 8 characters.";

            return;
        }

        if (password !== confirmPassword) {

            formMessage.textContent =
                "Passwords do not match.";

            return;
        }

        formMessage.textContent =
            "Registration form validated! Connect Java backend to create your account.";

        return;
    }


    // ======================================
    // LOGIN - DEMO MODE
    // ======================================

    if (email === "" || password === "") {

        formMessage.textContent =
            "Please enter email and password.";

        return;
    }

    // DEMO LOGIN:
    // Any non-empty email and password are accepted.
    // No password verification is performed.

    formMessage.style.color = "#f7dfa7";

    formMessage.textContent =
        "Login successful! Welcome to CARTZEE.";

    submitBtn.disabled = true;
    submitBtn.textContent = "Opening CARTZEE...";

    setTimeout(function() {

        window.location.href = "home.html";

    }, 800);

});


// ==========================================
// 6. FORGOT PASSWORD
// ==========================================

document.getElementById("forgot-link").addEventListener(
    "click",
    function(event) {

        event.preventDefault();

        formMessage.textContent =
            "Password recovery will be available soon.";

    }
);


// ==========================================
// 7. GOOGLE LOGIN DEMO
// ==========================================

document.getElementById("google-btn").addEventListener(
    "click",
    function() {

        formMessage.textContent =
            "Google authentication will be available after OAuth integration.";

    }
);


// ==========================================
// 8. FACEBOOK LOGIN DEMO
// ==========================================

document.getElementById("facebook-btn").addEventListener(
    "click",
    function() {

        formMessage.textContent =
            "Facebook authentication will be available after OAuth integration.";

    }
);


// ==========================================
// 9. INITIAL PAGE SETUP
// ==========================================

switchTab(false);

console.log("CARTZEE Authentication Loaded Successfully!");
