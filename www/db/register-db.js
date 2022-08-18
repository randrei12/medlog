import Loading from "../js/loading";

const registerForm = document.getElementById("register-form");

const loading = new Loading();
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
    
    loading.show();
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
                loading.hide();
                location = "patientHome.html";
            });

        })
        .catch((error) => {
            loading.hide();
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

    loading.show();
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
                loading.hide();
                location = "docHome.html";
            });

        })
        .catch((error) => {
            loading.hide();
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