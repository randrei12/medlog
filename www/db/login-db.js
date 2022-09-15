import Loading from "../js/loading.js";
import { USER_TYPES } from "./constants.js";
import { getLoggedUser } from '../js/Utils.js';
const loading = new Loading(false);

const loginForm = document.getElementById("login-form");

async function login(event) {
  event.preventDefault();
  loading.show();

  const email = event.target["email"].value;
  const password = event.target["password"].value;

  try {
    let userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    // Signed in
    let user = await getLoggedUser();
    loading.hide();
    location = user.type == USER_TYPES.PATIENT ? "html/patient/home.html" : "html/doctor/home.html";
  } catch (error) {
    loading.hide();
    alert(error.message);
  }
}

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    let user = await getLoggedUser();
    try {
        Capacitor.Plugins.SplashScreen.hide()
    } catch {}
    if (user) location = user.type == USER_TYPES.PATIENT ? "html/patient/home.html" : "html/doctor/home.html";
  } else try {
    Capacitor.Plugins.SplashScreen.hide()
  } catch {}
});

loginForm.onsubmit = (event) => login(event);
