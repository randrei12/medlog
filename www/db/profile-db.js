// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCC1TTaWpCU4bxhBD2l7ueviKKP1eskrpM",
    authDomain: "medlog-9650b.firebaseapp.com",
    databaseURL: "https://medlog-9650b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "medlog-9650b",
    storageBucket: "medlog-9650b.appspot.com",
    messagingSenderId: "955776050336",
    appId: "1:955776050336:web:7b7e3a9cb38de68d3695c5",
    measurementId: "G-424MJM444P"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.firestore();
const auth = firebase.auth();

const accountCard = document.getElementById("account-card");
const updateForm = document.getElementById("update-profile")

auth.onAuthStateChanged((user) => {
    if (user) {
        LoadProfile(user.uid);
    }
    else {
        window.location = "./patSignUp.html";
    }
})

function LoadProfile(uid) {

    const userDataRef = database.collection("users").doc(uid);

    userDataRef.get().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());

            const userData = doc.data();
            /*
            var accountContent = `
                <div class="profileCircle">
                    <div class="profileImgDiv">
                        <img src="assets/account.png" class="profileImg">
                    </div>
                </div>

                <form id='update-profile' class="personalData">
                    <div class="nameDiv">
                        <span class="inputLabel">Name</span>
                        <input value=${userData["username"]} class="nameInput"></input>
                    </div>
                    <div class="dualDiv">
                        <div class="nameDiv">
                            <span class="inputLabel">Gender</span>
                            <select name="gender" class="baseSelect">
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                        <div class="nameDiv">
                            <span class="inputLabel">Birthday</span>
                            <input name="birthdays" type="date" class="date">
                        </div>
                    </div>
                    <div class="dualDiv">
                        <div class="nameDiv">
                            <span class="inputLabel">City</span>
                            <select name="city" class="baseSelect">
                                <option value="">Cluj Napoca</option>
                                <option value="">Dej</option>
                                <option value="">Cuca Macaii</option>
                            </select>
                        </div>
                        <div class="nameDiv">
                            <span class="inputLabel">County</span>
                            <select name="county" class="baseSelect">
                                <option value="">Cluj</option>
                                <option value="">Brasov</option>
                                <option value="">Bucuresti</option>
                            </select>                    
                        </div>
                    </div>
                    <div class="nameDiv">
                        <span class="inputLabel">Family Doctor</span>
                        <input id="family-doctor" class="familyInput" />
                    </div>
                    <button type="submit" form="update-profile" class="baseButton">Update Profile</button>

                </form>
            `
            */
            console.log(document.getElementById("update-profile"));

            document.getElementById("update-profile").onsubmit = (event) => {
               
                event.preventDefault();

                const name = event.target["username"].value;
                const gender = event.target["gender"].value;
                const birthday = event.target["birthdate"].value;
                const city = event.target["city"].value;
                const country = event.target["county"].value;
                const familyDoctors = event.target["family-doctor"].value;

                
                console.log(name, gender, birthday, city, country, familyDoctors);


                database.collection('users').doc(uid).update({
                    username: name,
                    gender,
                    birthday: birthday,
                    city, 
                    county: country,
                    familyDoctor: familyDoctors
                })
                .then(() => {
                    alert("account updated");
                });
                return false;

            };

            //accountCard.innerHTML = accountContent;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

function UpdateProfile(event, uid) {
    event.preventDefault();

    alert('wokring')
    
    const name = event.target["name"].value;
    const gender = event.target["gender"].value
    const birthday = event.target["birthdate"].value;
    const city = event.target["city"].value;
    const country = event.target["county"].value;
    const familyDoctors = event.target["family-doctor"].value;

    database.collection('users').doc(uid).update({
        username: name,
        gender,
        birthday: birthday,
        city, 
        county: country,
        familyDoctor: familyDoctors
    })
    .then(() => {
        alert("account updated");
    });
}