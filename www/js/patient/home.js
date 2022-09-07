import Loading from "../loading.js";
import { getLoggedUser } from '../Utils.js';

const nameLabel = document.querySelector('.nameLabel');
const cardsContainter = document.querySelector("#cardsContainer");

const loading = new Loading();
if (!sessionStorage.getItem('user')) loading.show();
else {
    let data = JSON.parse(sessionStorage.getItem('user'))
    nameLabel.innerText = data.firstName + ' ' + data.lastName;
}

getLoggedUser().then(user => {
    if (!user) return location = "../../index.html";
    nameLabel.innerText = user.firstName + ' ' + user.lastName;
    loading.hide();
});

cardsContainter.innerText = 'Loading...'
firebase.firestore().collection("users").get().then((snapshot) => {
    cardsContainter.innerHTML = '';
    snapshot.forEach(element => {
        const userData = element.data();

        const userElement = document.createElement("div");
        userElement.classList = "card";

        userElement.onclick = () => location = `../doctor/profile.html?doctor=${element.id}`;

        if (userData["type"] == "doctor") {
            userElement.innerHTML = `
                <img style="width: 50%;" src="https://cdn.discordapp.com/attachments/708033159538802819/1009409429210419290/unknown.png" alt=""> 
                <div style="width: 50%;">
                    <h3>${userData["firstName"]} ${userData["lastName"]}</h3>
                    <p>${userData["specialization"]}</p>
                    <br>   
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star checked"></span>
                    <span class="fa fa-star"></span>
                </div>`;

            cardsContainter.append(userElement);
        }
    });
    if (cardsContainter.innerText === '') cardsContainter.innerText = 'Where did all doctors go?'
});
