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
    await selectRoleScreen(userCredential.user);
    loading.hide();
  } catch (error) {
    loading.hide();
    alert(error.message);
  }
}

(async () => {
    let user = await getLoggedUser();
    if (!user) try { Capacitor.Plugins.SplashScreen.hide() } catch {}
    else location = user.type == USER_TYPES.PATIENT ? "html/patient/home.html" : "html/doctor/home.html";
})();

firebase.auth().onAuthStateChanged((user) => {
  if (!user) try {
    Capacitor.Plugins.SplashScreen.hide()
  } catch {}
  else selectRoleScreen(user);
});

loginForm.onsubmit = (event) => login(event);
