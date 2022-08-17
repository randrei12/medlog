const registerForm = document.getElementById("register-form");

function RegisterPatient(event) {
    event.preventDefault();

    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    const confirmPassword = event.target["confirm-password"].value;
    const cnp = event.target["cnp"].value;
    const country = event.target["country"].value;

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            
            firebase.firestore().collection('users').doc(user.uid).set({
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

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            firebase.firestore().collection('users').doc(user.uid).set({
                username: name,
                email,
                password, 
                specialization, 
                country,
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

registerForm.onsubmit = location.href.includes("doc") ? RegisterDoctor : RegisterPatient;

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