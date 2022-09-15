import '../../db/config.js';
import { params } from '../Utils.js';
import Loading from '../loading.js';
import firebase from '../../db/config.js';
const [ cnp, phone, doctor, gender, birthday, county, city ] = document.querySelectorAll('.dataBox');
const loading = new Loading();
const fullName = document.querySelector(".patientName");
loading.show();
let uid = params.patient;
(async () => {
    console.log(uid);
    let res = await firebase.firestore().collection('users').doc(uid).get();
    let data = res.data();
    fullName.innerText = data.firstName + " " + data.lastName;
    cnp.innerText = data.cnp;
    phone.innerText = data.phoneNumber;
    doctor.innerText = data.familyDoctor;
    gender.innerText = data.gender;
    birthday.innerText = data.bday;
    county.innerText = data.county;
    city.innerText = data.city;
    console.log(data);
    loading.hide();
    //from now, we just have to set each element with it's correspondent object property
})();