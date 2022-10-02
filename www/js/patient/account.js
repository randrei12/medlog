import { localities, getLoggedUser } from '../Utils.js';
let locals = JSON.parse(localities);
const [ genderSelect, countySelect, citySelect ] = document.querySelectorAll('select');
const [ firstName, lastName, bday ] = document.querySelectorAll(".personalData input");
citySelect.innerHTML = locals['CJ'];
countySelect.onchange = () => citySelect.innerHTML = locals[countySelect.value];

const topNavChilds = document.querySelector('.topNavContainer').children;

topNavChilds[0].onclick = () => history.back();
topNavChilds[1].onclick = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
}

const inputs = [
  ...document.querySelectorAll(".personalData input"),
];

getLoggedUser().then(user => {
    if (!user) location = '../../index.html';
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    genderSelect.value = user.gender;
    bday.value = user.bday;
    countySelect.value = user.county;
    citySelect.innerHTML = locals[user.county];
    citySelect.value = user.city;
});