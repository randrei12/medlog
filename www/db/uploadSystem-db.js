import Loading from "../js/loading.js";
import { getLoggedUser, params } from "../js/Utils.js";
import firebase from "./config.js";

const loading = new Loading()
const fileButton = document.querySelector("#file");
const screens = {
    addTreatment: () => {
        fileButton.addEventListener("click", () => {
            Swal.fire({
                title: 'Add Treatment',
                showCloseButton: true,
                confirmButtonText: 'Add',
                html: '<input class="SwalInput" placeholder="Name"><div class="SwalDiv"><input class="SwalInput" placeholder="Start Date" type="date"><input class="SwalInput" placeholder="End Date" type="date"></div><input class="SwalInput" placeholder="Frequency" type="number"><input class="SwalInput" placeholder="Hour" type="time">',
                preConfirm: () => {
                    const [ Name, StartDate, EndDate, Frequency, Hour ] = [...Swal.getPopup().querySelectorAll('.SwalInput')].map(e => e.value);
                    if (!(Name && StartDate && EndDate && Frequency && Hour)) Swal.showValidationMessage(`All sections must be filled`);
                    if (new Date(EndDate) <= new Date(StartDate)) Swal.showValidationMessage(`The time interval is not correct`);
                    return { Name, StartDate, EndDate, Frequency, Hour };
                }
            }).then(async res => {
                if(!res.isConfirmed) return;
                loading.show();
                const user = await getLoggedUser();
                if (!user) location = '../../index.html'; 
                const pat = params.uid;
                try {
                    const date = new Date();
                    const obj = (await firebase.firestore().collection('treatments').doc(pat).get()).data() || {};
                    const arr = obj[user.uid] || [];
                    arr.push({ ...res.value, docName: `${user.firstName} ${user.lastName}`, time: `${('0' + date.getDate()).substr(-2)}/${('0' + (date.getMonth() + 1)).substr(-2)}/${date.getFullYear()}`});
                    obj[user.uid] = arr;
                    await firebase.firestore().collection('treatments').doc(pat).set(obj);
                    loading.hide(); 
                    Swal.fire('Success', 'The treatment was added successfully.', 'success');
                } catch (e) {
                    console.log(e);
                    Swal.fire('Error', 'The treatment couldn\'t be added.', 'error');
                    loading.hide();
                }
            });
        });
    },
    addMedicalFile: () => {
        fileButton.addEventListener("change", e => {
            const file = e.target.files[0];
            const storageRef = firebase.storage().ref(`medicalFiles/${params.uid}/` + file.name);
            storageRef.put(file).then(() => {
                Swal.fire(
                    'Good job!',
                    'File Uploaded',
                    'success'
                );
            });
        });
    },
    addPrescription: () => {
        fileButton.addEventListener("change", e => {
            const file = e.target.files[0];
            const storageRef = firebase.storage().ref(`prescriptionFiles/${params.uid}/` + file.name);
            storageRef.put(file).then(() => {
                Swal.fire(
                    'Good job!',
                    'File Uploaded',
                    'success'
                );
            });
        });
    },
}

screens[location.href.substring(location.href.lastIndexOf('/') + 1, location.href.lastIndexOf('.html'))]();