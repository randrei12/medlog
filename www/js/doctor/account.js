import "../../db/config.js";
import { getLoggedUser, localities } from "../Utils.js";
const locals = JSON.parse(localities);

const [ backButton, signOutButton ] = document.querySelectorAll('.topNavContainer img');
const [ firstName, lastName] = document.querySelectorAll('.docName input');
const specialization = document.querySelector('.specialisation input');
const [ CountySelect, CitySelect ] = document.querySelectorAll('.nameDiv > select');
const phoneNumber = document.querySelector('.phoneNumber input');
const email = document.querySelector('.email input');
const hospital = document.querySelector('.hospital input');
const aboutDoc = document.querySelector('.aboutDoc');
const editButton = document.querySelector('.editButtonDocDiv > button');

(async() => {
    const user = await getLoggedUser();
    if (!user) location = '../../index.html';
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    specialization.value = user.specialization;
    CountySelect.value = user.county;
    CountySelect.onchange = () => CitySelect.innerHTML = locals[CountySelect.value];
    CitySelect.innerHTML = locals[CountySelect.value];
    CitySelect.value = user.city;
    phoneNumber.value = user.phoneNumber;
    email.value = user.email;
    hospital.value = user.hospital;
    aboutDoc.value = user.description;
})();

backButton.onclick = () => history.back();
signOutButton.onclick = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    location = '../../index.html'
}

editButton.onclick = () => {
    firebase.firestore().collection('users').doc(data.uid).update({
        firstName: firstName.value,
        lastName: lastName.value,
        specialization: specialization.value,
        county: CountySelect.value,
        city: CitySelect.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        hospital: hospital.value,
        description: aboutDoc.value
    }).then(() => {
        location = 'home.html'
    }).catch(e => {
        alert('An error occured')
    })
}