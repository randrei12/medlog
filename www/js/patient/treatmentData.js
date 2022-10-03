import firebase from '../../db/config.js';
import { params, getLoggedUser } from '../Utils.js';

const spans = [...document.querySelectorAll('h1 > span')];

(async () => {
    const user = await getLoggedUser();
    const res = await firebase.firestore().collection("treatments").doc(user.uid).get();
    try {
        const data = res.data()[params.doc][params.index];
        console.log(data);
        spans.forEach(span => span.innerText = data[span.dataset.type])
    } catch {}
})();