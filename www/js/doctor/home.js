import Loading from "../loading.js";
import { getLoggedUser } from '../Utils.js';

const nameLabel = document.querySelector('.nameLabel');
const loading = new Loading();
loading.show();

getLoggedUser().then(user => {
    if (!user) return location = "../../index.html";
    nameLabel.innerText = user.firstName + ' ' + user.lastName;
    loading.hide();
});