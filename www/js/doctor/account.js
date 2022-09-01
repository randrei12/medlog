if (!sessionStorage.getItem('user')) location = 'home.html';
let data = JSON.parse(sessionStorage.getItem('user'));

const topNavChilds = document.querySelector('.topNavContainer').children;

topNavChilds[0].onclick = history.back;
topNavChilds[1].onclick = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    location = '../../index.html';
}

const [ firstName, lastName] = document.querySelectorAll('.docName input');
const specialization = document.querySelector('.specialisation input');
const [ CountySelect, CitySelect ] = document.querySelectorAll('.nameDiv > select');
const hospital = document.querySelector('.hospital input');
const aboutDoc = document.querySelector('.aboutDoc');

firebase.firestore().collection('users').doc(data.uid).get().then(res => {
    let user = res.data();
    firstName.value = user.firstName;
    lastName.value = user.lastName;
    specialization.value = user.specialization;
    CountySelect.value = user.county;
    CitySelect.value = user.city;
    hospital.value = user.hospital;
    aboutDoc.value = user.description;
});

const editButton = document.querySelector('.editButtonDocDiv > button');
editButton.onclick = () => {
    firebase.firestore().collection('users').doc(data.uid).update({
        firstName: firstName.value,
        lastName: lastName.value,
        specialization: specialization.value,
        county: CountySelect.value,
        city: CitySelect.value,
        hospital: hospital.value,
        description: aboutDoc.value
    }).then(() => {
        location = 'home.html'
    }).catch(e => {
        alert('Error: ' + e.code)
    })
}