import Loading from "../loading.js";

const topNavChilds = document.querySelector('.topNavContainer').children;

topNavChilds[0].onclick = history.back;
topNavChilds[1].onclick = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    location = '../../index.html';
}

const inputs = [
  ...document.querySelectorAll(".personalData input, .personalData select"),
];

const loading = new Loading();
loading.show();
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    firebase.firestore().collection("users").doc(user.uid).get().then(doc => {
        loading.hide();
        let data = doc.data();
        inputs[0].value = data.firstName;
        inputs[1].value = data.lastName;
        inputs[2].value = data.gender;
        inputs[3].value = data.bday;
        inputs[4].value = data.county;
        inputs[5].value = data.city;
        inputs[6].value = data.familyDoctor;
    }).catch(() => {
        location = "../../index.html"
    });
  } else location = "../../index.html";
});