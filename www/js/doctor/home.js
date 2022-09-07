import Loading from "../loading.js";
import { getLoggedUser } from '../Utils.js';

const nameLabel = document.querySelector('.nameLabel');
const loading = new Loading();
if (!sessionStorage.getItem('user')) loading.show();
else {
    let data = JSON.parse(sessionStorage.getItem('user'));
    nameLabel.innerText = data.firstName + ' ' + data.lastName;
}

getLoggedUser().then(user => {
    if (!user) return location = "../../index.html";
    nameLabel.innerText = data.firstName + ' ' + data.lastName;
    loading.hide();
});