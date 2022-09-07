import '../../db/config.js';
import { params } from '../Utils.js';
import Loading from '../loading.js';
import firebase from '../../db/config.js';
const loading = new Loading();
loading.show();
let uid = params.patient;
(async () => {
    let user = sessionStorage.getItem('user');
    if (!user) await new Promise(resolve => {
        firebase.auth().onAuthStateChanged(async e => {
            if (!e) return location = '../../index.html';
            let res = await firebase.firestore().collection('users').doc(uid).get();
            user = res.data();
            sessionStorage.setItem('user', user);
            resolve();
        });
    });
    loading.hide();

    //from now, we just have to set each element with it's correspondent object property
})();