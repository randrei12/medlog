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

const database = firebase.database();
const auth = firebase.auth();


auth.onAuthStateChanged((user) => {
    if(user) {
        window.location = "./patcientHome.html"
    }
    else {
        window.location = "./patSignUp.html";
    }
})