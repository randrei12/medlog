import '../../db/config.js';
import { params } from '../Utils.js';
import firebase from '../../db/config.js';
const [ cnp, phone, gender, birthday, county, city ] = document.querySelectorAll('.dataBox');
const fullName = document.querySelector(".patientName");
const buttons = [...document.querySelectorAll('.buttons > a')];
const screens = ['medicalHistory', 'addMedicalFile', 'addTreatmentScreen', 'addPrescriptionScreen'];
let uid = params.patient;
for (let i = 0; i < buttons.length; ++i) buttons[i].href = `../doctor/${screens[i]}.html?uid=${uid}`;
(async () => {
    let res = await firebase.firestore().collection('users').doc(uid).get();
    let data = res.data();
    fullName.innerText = data.firstName + " " + data.lastName;
    cnp.innerText = data.cnp;
    phone.innerText = data.phoneNumber;
    gender.innerText = data.gender;
    birthday.innerText = data.bday;
    county.innerText = data.county;
    city.innerText = data.city;
    //from now, we just have to set each element with it's correspondent object property
})();