const inputs = [...document.querySelectorAll('.personalData input, .personalData select')];

var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
            let data = doc.data();
            inputs[0].value = data.username;
            // inputs[1].value = data.gender;
            // inputs[2].value = data.birthday;
            // inputs[3].value = data.city;
            inputs[4].value = data.country;
            inputs[5].value = data.familyDoctor;    
        })
    } else location = 'index.html';
})
