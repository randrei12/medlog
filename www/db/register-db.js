import Loading from "../js/loading.js";

const registerForm = document.getElementById("register-form");

const loading = new Loading();
function RegisterPatient(event) {
  event.preventDefault();

  const firstName = event.target["first-name"].value;
  const lastName = event.target["last-name"].value;
  const gender = event.target["gender"].value;
  const email = event.target["email"].value;
  const password = event.target["password"].value;
  const confirmPassword = event.target["confirm-password"].value;
  const cnp = event.target["cnp"].value;
  const country = event.target["country"].value;
  const phoneNumber = event.target["phone-number"].value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }
  if(!gender) {
    alert("You must specify a gender");
    return;
  }

  loading.show();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          email: email,
          password: password,
          cnp: cnp,
          country: country,
          uid: user.uid,
          phoneNumber: phoneNumber,
          type: "patient",
        })
        .then(() => {
          loading.hide();
          location = "home.html";
        });
    })
    .catch((error) => {
      loading.hide();
      var errorCode = error.code;
      var errorMessage = error.message;

      alert(errorMessage);
    });
}

function RegisterDoctor(event) {
  event.preventDefault();

  const firstName = event.target["first-name"].value;
  const lastName = event.target["last-name"].value;
  const email = event.target["email"].value;
  const password = event.target["password"].value;
  const confirmPassword = event.target["confirm-password"].value;
  const specialization = event.target["specialization"].value;
  const country = event.target["country"].value;
  const phoneNumber = event.target["phone-number"].value;

  if (password != confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  loading.show();
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          firstName,
          lastName,
          email,
          password,
          specialization,
          country,
          uid: user.uid,
          phoneNumber, 
          type: "doctor",
        })
        .then(() => {
          loading.hide();
          location = "home.html";
        });
    })
    .catch((error) => {
      loading.hide();
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });
}

registerForm.onsubmit = location.href.includes("doc")
  ? RegisterDoctor
  : RegisterPatient;

// if(location.href.includes("doc")) {
//     registerForm.onsubmit = (event) => {
//         RegisterDoctor(event);
//     }
// }
// else {
//     registerForm.onsubmit = (event) => {
//         RegisterPatient(event);
//     }
// }
