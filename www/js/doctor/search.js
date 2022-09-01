import firebase from '../../db/config.js';
import { USER_TYPES } from '../../db/constants.js';

const searchInput = document.querySelector('input');
searchInput.onkeyup = async e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        let res = await firebase.firestore().collection('users').where('type', '==', USER_TYPES.PATIENT).get();
        let patients = [];
        res.forEach(e => patients.push(e.data()));
        console.log(patients);
    }
}