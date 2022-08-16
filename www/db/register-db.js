// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCC1TTaWpCU4bxhBD2l7ueviKKP1eskrpM",
    authDomain: "medlog-9650b.firebaseapp.com",
    databaseURL: "https://medlog-9650b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "medlog-9650b",
    storageBucket: "medlog-9650b.appspot.com",
    messagingSenderId: "955776050336",
    appId: "1:955776050336:web:7b7e3a9cb38de68d3695c5",
    measurementId: "G-424MJM444P"
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

const registerForm = document.getElementById("register-form");


function RegisterPatient(event) {
    event.preventDefault();

    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    const confirmPassword = event.target["confirm-password"].value;
    const cnp = event.target["cnp"].value;
    const country = event.target["country"].value;

    if(password != confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            
            db.collection('users').doc(user.uid).set({
                username: name,
                email: email,
                password: password, 
                cnp: cnp, 
                country: country,
                uid: user.uid,
                type: "patient"
            })
            .then(() => {
                location = "patientHome.html";
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            alert(errorMessage);
        });
};

function RegisterDoctor(event) {
    event.preventDefault();

    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    const confirmPassword = event.target["confirm-password"].value;
    const specialization = event.target["specialization"].value;
    const country = event.target["country"].value;

    if(password != confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            db.collection('users').doc(user.uid).set({
                username: name,
                email: email,
                password: password, 
                specialization: specialization, 
                country: country,
                uid: user.uid,
                type: "doctor"
            })
            .then(() => {
                location = "docHome.html";
            });

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
        });
}

if(location.href.includes("doc")) {
    registerForm.onsubmit = (event) => {
        RegisterDoctor(event);
    }
}
else {
    registerForm.onsubmit = (event) => {
        RegisterPatient(event);
    }
}
