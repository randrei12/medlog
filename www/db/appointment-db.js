import firebase from "./config.js"; 
import { params } from "../js/Utils.js";

const user_uid = params.doctor;

const appointmentForm = document.getElementById("appointment-form");
const drName = document.querySelector(".drName");
const drSpec = document.querySelector(".spec");
firebase.auth().onAuthStateChanged((user) => {
    if (user)  { console.log(user_uid);  appointmentForm.onsubmit = (event) => { SetAppointment(event, user_uid, user.uid); } }
    else location = "../../index.html";
});
(async () => {
    console.log(user_uid);
    let res = await firebase.firestore().collection('users').doc(user_uid).get();
    let data = res.data();
    drName.innerText = "Dr. " + data.firstName + " " + data.lastName;
    drSpec.innerText = data.specialization;
})();
function SetAppointment(event, uid, patient_uid) {
    event.preventDefault();

    const dateInput = event.target["date-input"].value;
    const timeInput = event.target["time-input"].value;

    
    try {
        const result = firebase.firestore().collection("appointments").doc(uid).get();
        const data = result.data();
        
        appointmentsData = data.appointments;
    
        appointmentsData.push({
            doctor_id: uid,
            date: dateInput,
            time: timeInput,
            patient_id: patient_uid
        });
    
        firebase.firestore().collection("appointments").doc(uid).update({
            appointments: appointmentsData
        }).then(() => {
            console.log("Success")
        });
    } catch {

        const appointmentsList = [
            {
                doctor_id: uid,
                date: dateInput,
                time: timeInput,
                patient_id: patient_uid       
            }
        ]

        firebase.firestore().collection("/appointments").doc(uid).set({
            appointments: appointmentsList
        }).then(() => {
            alert("Appointment Done!");
        })
    }
    

    return false;
}