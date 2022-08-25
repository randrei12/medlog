import '../../db/config.js';
import { params } from "../Utils.js";
import Loading from '../loading.js';
let nameLabel = document.querySelector('.doctorName');
const loading = new Loading();
loading.show()
let uid = params.doctor
const userDataRef = firebase.firestore().collection("users").doc(uid);
userDataRef
    .get()
    .then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const userData = doc.data();
            nameLabel.innerText = 'Dr. ' + doc.data().username;
            loading.hide()
        } else {
            loading.hide();
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    })
    .catch((error) => {
        console.log("Error getting document:", error);
        loading.hide();
    });