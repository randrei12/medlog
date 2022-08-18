import Loading from "../js/loading";

const cardsContainter = document.getElementById("cards-container");

const loading = new Loading();
loading.show();
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        //blablabla
    }
    else location = "./index.html";
})
// firebase.firestore().collection('users').where('type', '==', 'doctor').hrt()
firebase.firestore().collection('users').get().then(snapshot => {
    location.show();
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
    loading.hide();
})


