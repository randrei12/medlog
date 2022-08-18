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

const cardsContainter = document.getElementById("cards-container");

auth.onAuthStateChanged((user) => {
    if (user) {
        //blablabla
    }
    else {
        window.location = "./patSignUp.html";
    }
})
// database.collection('users').where('type', '==', 'doctor').hrt()
database.collection('users').get().then(snapshot => {
    snapshot.forEach(element => {

        console.log(element.id)
        const userData = element.data();

        const userElement = document.createElement("div");
        userElement.classList = "card";
        
        userElement.onclick = () => {
            location = `./doctor.html?id=${element.id}`;
        }

        if(userData["type"] == "doctor") {
            userElement.innerHTML = `
                <img style="width: 50%;" src="https://cdn.discordapp.com/attachments/708033159538802819/1009409429210419290/unknown.png" alt=""> 
                <div style="width: 50%;">
                    <h3>${userData["username"]}</h3>
                    <p>${userData["specialization"]}</p>
                    <br>   
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                </div>
            `;
        
            cardsContainter.append(userElement);
        }
        
    });
})


