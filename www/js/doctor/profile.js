import '../../db/config.js';
import { params, roundTo } from "../Utils.js";
import { getDoctorReview } from '../../db/DoctorService.js';
import Loading from '../loading.js';
const nameLabel = document.querySelector('.doctorName');
const averageLabel = document.querySelector('.average');
const specializationLabel = document.querySelector('.specialization');
const phoneLabel = document.querySelector('.callButton');
const emailLabel = document.querySelector('.emailButton');
const doctorReviewURL = document.querySelector('#doctor')
const loading = new Loading();
loading.show()
const uid = params.doctor
const userDataRef = firebase.firestore().collection("users").doc(uid);
userDataRef
    .get()
    .then(async (doc) => {
        if (doc.exists) {
            const ratings = await getDoctorReview(uid);
            console.log(ratings);
            const userData = doc.data();
            nameLabel.innerText = 'Dr. ' + userData.username;
            averageLabel.innerText = `${roundTo(ratings.average)} rating`;
            phoneLabel.href = `tel:${userData.phone}`;
            emailLabel.href = `mailto:${userData.email}`;
            console.log(specializationLabel);
            specializationLabel.innerText = userData.specialization;
            doctorReviewURL.href = `../../html/patient/reviewComponent.html?doctor=${uid}`
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