/* === Imports === */
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import {signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";



/* === Firebase Setup === */
const firebaseConfig = {
    apiKey: "AIzaSyCfphGCUp3YHg-tJdP2ybzT9nVYcvW6dAo",
    authDomain: "u5l2-d3227.firebaseapp.com",
    projectId: "u5l2-d3227",
    storageBucket: "u5l2-d3227.firebasestorage.app",
    messagingSenderId: "191307725554",
    appId: "1:191307725554:web:bae1c69e9fd166dcf16e6b"
  };


  const app= initializeApp(firebaseConfig)
  const auth = getAuth(app)
  console.log(auth)


/* === UI === */

/* == UI - Elements == */

const userGreetingEl = document.getElementById("user-greeting")

const userProfilePictureEl = document.getElementById("user-profile-picture")
const signOutButtonEl = document.getElementById("sign-out-btn")

const viewLoggedOut = document.getElementById("logged-out-view")
const viewLoggedIn = document.getElementById("logged-in-view")

const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn")

const emailInputEl = document.getElementById("email-input")
const passwordInputEl = document.getElementById("password-input")

const signInButtonEl = document.getElementById("sign-in-btn")
const createAccountButtonEl = document.getElementById("create-account-btn")

/* == UI - Event Listeners == */
signOutButtonEl.addEventListener("click", authSignOut)

signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle)

signInButtonEl.addEventListener("click", authSignInWithEmail)
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail)

/* === Main Code === */



onAuthStateChanged(auth, (user) => {
    if (user) {
        showLoggedInView()
        showProfilePicture(userProfilePictureEl, user); 
        showUserGreeting(userGreetingEl, user);
    } else {
        showLoggedOutView()
    }
 })
 

/* === Functions === */

/* = Functions - Firebase - Authentication = */

function authSignInWithGoogle() {
    console.log("Sign in with Google")
}

function authSignInWithEmail() { 
    console.log("Sign in with email and password"); 
    const email = emailInputEl.value.trim();
    const password = passwordInputEl.value.trim();
    signInWithEmailAndPassword(auth, email, password) 
        .then((userCredential) => {
            showLoggedInView(); 
        }) 
        .catch((error) => {         
            console.error(error.message); 
        }); 
    }

function authCreateAccountWithEmail() {
    console.log("Sign up with email and password");
    const email = emailInputEl.value.trim();
    const password = passwordInputEl.value.trim();


    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            showLoggedInView();
        })
        .catch((error) => {
            console.error("Error creating user:", error.message);
        });
}

function authSignOut() {
    const auth = getAuth();
    signOut(auth) 
    .then(() => {
        showLoggedOutView(); 
    }) 
    .catch((error) => { 
        console.error(error.message); 
    });
}

// showUserGreeting(userGreetingEl, user)
// showProfilePicture()



/* == Functions - UI Functions == */

function showUserGreeting(element, user) {
     if (user.displayName) {
        const firstName = user.displayName.split(" ")[0];
        element.textContent = `Hi ${firstName}, how are you?`;
     }
     else {
        element.textContent = "Hey friend, how are you?"; 
    }
 }

/* == Functions - UI Functions == */
function showProfilePicture(imgElement, user) {
    if (user && user.photoURL) {
      imgElement.src = user.photoURL;
    } else {
      imgElement.src = "assets/images/defaultPic.jpg";
    }
  }

function showLoggedOutView() {
    hideView(viewLoggedIn)
    showView(viewLoggedOut)
 }
 
 
 function showLoggedInView() {
    hideView(viewLoggedOut)
    showView(viewLoggedIn)
 }
 
 
 function showView(view) {
    view.style.display = "flex"
 }
 
 
 function hideView(view) {
    view.style.display = "none"
 }
 

//credit: coursera