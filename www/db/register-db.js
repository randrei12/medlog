import Loading from "../js/loading.js";
import firebase from "./config.js";

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
    const county = event.target["county"].value;
    const city = event.target["city"].value;
    const phoneNumber = event.target["phone-number"].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    loading.show();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(userCredential => {
        // Signed in
        let user = userCredential.user;
        firebase.firestore().collection("users").doc(user.uid).set({
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            email: email,
            password: password,
            cnp: cnp,
            county: county,
            uid: user.uid,
            city: city,
            phoneNumber: phoneNumber,
            type: "patient",
        }).then(() => {
            loading.hide();
            location = "home.html";
        });
   }).catch(error => {
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
    const county = event.target["county"].value;
    const city = event.target["city"].value;
    const phoneNumber = event.target["phone-number"].value;

    if (password != confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    loading.show();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        firebase.firestore().collection("users").doc(user.uid).set({
            firstName,
            lastName,
            email,
            password,
            specialization,
            county,
            city,
            uid: user.uid,
            phoneNumber, 
            type: "doctor",
            description: ''
        }).then().catch((error) => {
            loading.hide();
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });

        firebase.firestore().collection('ratings').doc(user.id).set({
            average: 0,
            noOfReviews: 0,
            reviews: []
        }).then(() => {
            loading.hide();
            location = "home.html";
        }).catch(e => {
            loading.hide();
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        })
    });
}

registerForm.onsubmit = location.href.includes("doc") ? RegisterDoctor : RegisterPatient;
