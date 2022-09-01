import firebase from '../../db/config.js';
import { USER_TYPES } from '../../db/constants.js';

const searchInput = document.querySelector('input');
const select = document.querySelector('select');
const patientsList = document.querySelector('.patientsList');

searchInput.onkeyup = async e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        patientsList.innerHTML = '';
        let res = await firebase.firestore().collection('users').where('type', '==', USER_TYPES.DOCTOR).get();
        let patients = [];
        res.forEach(e => patients.push(e.data()));
        patients = select.value === 'spe' ? patients.filter(e => e.specialization.toLowerCase() === searchInput.value.toLowerCase()) : patients.filter(e => [e.firstName.toLowerCase(), e.lastName.toLowerCase()].sort().join(',') === searchInput.value.split(' ').map(e => e.toLowerCase()).sort().join(','));
        if (patients.length === 0) patientsList.innerHTML = 'No Results'
        else patients.forEach(e => {
            patientsList.innerHTML += `
            <button class="patient-button" onclick="location = '../doctor/profile.html?doctor=${e.uid}'">
                <img class="account-image" src="../../assets/account.png" alt="Acount Image">
                <p class="name"><span>${e.firstName}</span> <span>${e.lastName}</span></p>
            </button>
            `
        })
    }
}