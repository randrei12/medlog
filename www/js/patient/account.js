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
        inputs[0].value = data.username;
        // inputs[1].value = data.gender;
        // inputs[2].value = data.birthday;
        // inputs[3].value = data.city;
        inputs[4].value = data.country;
        inputs[5].value = data.familyDoctor;
    }).catch(() => {
        location = "../../index.html"
    });
  } else location = "../../index.html";
});