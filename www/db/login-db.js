import Loading from "../js/loading.js";
const loading = new Loading(false);

async function selectRoleScreen(user) {
  // loading.show();
  try {
    let usersCollection = firebase.firestore().collection("users");
    let result = await usersCollection.doc(user.uid).get();
    console.log(result.data());
    Capacitor.Plugins.SplashScreen.hide()
    location =
      result.data().type == USER_TYPES.PATIENT
        ? "html/patient/home.html"
        : "html/doctor/home.html";
  } catch (error) {
    Capacitor.Plugins.SplashScreen.hide()
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
  if (!user) Capacitor.Plugins.SplashScreen.hide()
  else selectRoleScreen(user);
});

const loginForm = document.getElementById("login-form");
loginForm.onsubmit = (event) => login(event);
