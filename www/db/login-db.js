// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC1TTaWpCU4bxhBD2l7ueviKKP1eskrpM",
  authDomain: "medlog-9650b.firebaseapp.com",
  databaseURL:
    "https://medlog-9650b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "medlog-9650b",
  storageBucket: "medlog-9650b.appspot.com",
  messagingSenderId: "955776050336",
  appId: "1:955776050336:web:7b7e3a9cb38de68d3695c5",
  measurementId: "G-424MJM444P",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();
const auth = firebase.auth();
const db = firebase.firestore();
const loginForm = document.getElementById("login-form");

function GetUserDetails(uid) {
  try {
    database
      .ref("users/" + uid)
      .get()
      .then((result) => {
        console.log(result);
      });
  } catch (error) {
    throw error;
  }
}

function Login(event) {
  event.preventDefault();

  const email = event.target["email"].value;
  const password = event.target["password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      db.collection("users")
        .doc(user.uid)
        .get()
        .then((result) => {
          console.log(result.data());
          if (result.data().type == USER_TYPES.PATIENT) {
            location = "patientHome.html";
          } else {
            location = "docHome.html";
          }
        });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

loginForm.onsubmit = (event) => {
  Login(event);
};
