import Loading from "../js/loading.js";
import { USER_TYPES } from "./constants.js";
const loading = new Loading(false);

document.body.style.height = innerHeight + 'px';

async function selectRoleScreen(user) {
  // loading.show();
  try {
    let usersCollection = firebase.firestore().collection("users");
    let result = await usersCollection.doc(user.uid).get();
    console.log(result.data());
    try {
      Capacitor.Plugins.SplashScreen.hide()
    } catch {}
    location =
      result.data().type == USER_TYPES.PATIENT
        ? "html/patient/home.html"
        : "html/doctor/home.html";
  } catch (error) {
    try {
      Capacitor.Plugins.SplashScreen.hide()
    } catch {}
    alert(error.message);
  }
}

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
    await selectRoleScreen(userCredential.user);
    loading.hide();
  } catch (error) {
    loading.hide();
    alert(error.message);
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (!user) try {
    Capacitor.Plugins.SplashScreen.hide()
  } catch {}
  else selectRoleScreen(user);
});

const loginForm = document.getElementById("login-form");
loginForm.onsubmit = (event) => login(event);
