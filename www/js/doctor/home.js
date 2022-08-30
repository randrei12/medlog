import Loading from "../loading.js";

const loading = new Loading();
if (!sessionStorage.getItem('user')) loading.show();
else {
    let data = JSON.parse(sessionStorage.getItem('user'))
    nameLabel.innerText = data.firstName + ' ' + data.lastName;
}

firebase.auth().onAuthStateChanged(async user => {
    if (user) {
        let data = (await firebase.firestore().collection('users').doc(user.uid).get()).data();
        sessionStorage.setItem('user', JSON.stringify(data));
        nameLabel.innerText = data.firstName + ' ' + data.lastName;
        loading.hide();
    } else location = "../../index.html";
});