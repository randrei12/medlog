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
})
// firebase.auth().onAuthStateChanged(user => {
//   if (user) {
//     firebase.firestore().collection("users").doc(user.uid).get().then(doc => {
//         loading.hide();
//         let data = doc.data();
//         inputs[0].value = data.firstName;
//         inputs[1].value = data.lastName;
//         inputs[2].value = data.gender;
//         inputs[3].value = data.bday;
//         inputs[4].value = data.county;
//         inputs[5].value = data.city;
//     }).catch(() => {
//         location = "../../index.html"
//     });
//   } else location = "../../index.html";
// });