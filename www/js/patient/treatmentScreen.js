import firebase from "../../db/config.js";
import Loading from "../loading.js";
import { getLoggedUser, params } from "../Utils.js";

const historyList = document.querySelector('.historyList');
(async () => {
    const { uid } = await getLoggedUser();
    const docId = params.doc;
    if (docId) await getTreatments(uid, docId);
    else await getDoctors(uid);
})();

async function getDoctors(uid) {
    const res = await firebase.firestore().collection('treatments').doc(uid).get();
    historyList.innerText = ''; 
    if (!res.exists) return historyList.innerText = 'There are no treatments'; 
    const data = res.data();
    const docsId = Object.getOwnPropertyNames(data);
    docsId.forEach(docId => {
        historyList.innerHTML += `
            <a href="treatmentScreen.html?doc=${docId}">
                <button class="history-button">
                    <img class="folder-image" src="../../assets/account.png" alt="" style="margin-left: 20px; height: 70%;">
                    <div>
                        <h2 class="medic">${data[docId][0].docName}<br></h2>
                        <h2 class="data" style="font-size: 15px"></h2>
                    </div>
                </button>
            </a>`;    
    });
}

async function getTreatments(uid, docId) {
    const res = await firebase.firestore().collection('treatments').doc(uid).get();
    const treatments = res.data()[docId];
    treatments.forEach((treatment, index) => {
        historyList.innerHTML += `
            <a href="treatmentData.html?doc=${docId}&index=${index}">
                <button class="history-button">
                    <img class="folder-image" src="../../assets/file.png" alt="" style="margin-left: 20px; height: 70%;">
                    <div>
                        <h2 class="medic">${treatment.Name}<br></h2>
                        <h2 class="data" style="font-size: 15px">${treatment.time}</h2>
                    </div>
                </button>
            </a>`;
        console.log(treatment);
    })
}

// firebase.storage().ref()