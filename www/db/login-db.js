import Loading from "../js/loading.js";

firebase.auth().onAuthStateChanged((user) => {
    if (user) firebase.firestore().collection("users").doc(user.uid).get().then(e => location = e.data().type == USER_TYPES.PATIENT ? "patientHome.html" : "docHome.html")
})

const loginForm = document.getElementById("login-form");

const loading = new Loading();
function Login(event) {
    event.preventDefault();
    loading.show();
    const email = event.target["email"].value;
    const password = event.target["password"].value;

    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            firebase.firestore().collection("users")
                .doc(user.uid)
                .get()
                .then((result) => {
                    console.log(result.data());
                    loading.hide();
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
            loading.hide();
            alert(errorMessage);
        });
}

loginForm.onsubmit = Login;