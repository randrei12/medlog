async function selectRoleScreen(user) {
  if (!user) {
    return;
  }

  try {
    let usersCollection = firebase.firestore().collection("users");
    let result = await usersCollection.doc(user.uid).get();
    console.log(result.data());
    location = (result.data().type == USER_TYPES.PATIENT)
      ? "patientHome.html"
      : "docHome.html";
  }
  catch (error) {
    alert(error.message);
  }
}

async function login(event) {
  event.preventDefault();

  const email = event.target["email"].value;
  const password = event.target["password"].value;

  try {
    let userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    // Signed in
    await selectRoleScreen(userCredential.user);
  }
  catch (error) {
    alert(error.message);
  }
}

firebase.auth().onAuthStateChanged(user => selectRoleScreen(user))

const loginForm = document.getElementById("login-form");
loginForm.onsubmit = event => login(event);