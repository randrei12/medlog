import firebase from "../../db/config.js";
import Loading from "../loading.js";
import { getLoggedUser } from "../Utils.js";

const patientsList = document.querySelector('.patientsList');

(async () => {
    const types = ['image', 'video', 'audio']; 
    let user = await getLoggedUser();
    if (!user) location = '../../index.html';
    let fs = await firebase.storage().ref('prescriptionFiles/' + user.uid).listAll();
    fs.items.forEach(async e => {
        let url = await e.getDownloadURL();
        let { contentType, name, timeCreated } = await e.getMetadata();
        let time = new Date(timeCreated);
        let type = contentType.substring(0, contentType.indexOf('/'));
        patientsList.innerHTML += `
        <button class="patient-button" style="height: 100px; max-height: 100px" onclick="openModal('${url}', '${type}')">
            <img class="account-image" src="../../assets/${types.includes(type) ? type : 'file'}.png" alt="Acount Image">
            <p class="name"><span style="font-size:20px; margin-left: 15px;">${name}</span><br><span style="font-size: 15px;">${('0' + time.getDate()).slice(-2) + '/' + ('0' + (time.getMonth() + 1)).slice(-2) + '/' + time.getFullYear()}</span></p>
        </button>`
    });
})();