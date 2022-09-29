import { params } from "../js/Utils.js";

const fileButton = document.querySelector("#file");

fileButton.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const fileType = location.href.includes("Medical") ? "medicalFiles" : "prescriptionFiles";
    const storageRef = firebase.storage().ref(`${fileType}/${params.uid}/` + file.name);
    storageRef.put(file).then(() => {
        Swal.fire(
            'Good job!',
            'File Uploaded',
            'success'
        );
    });
});