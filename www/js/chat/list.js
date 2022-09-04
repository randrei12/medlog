import firebase from '../../db/config.js';
import Loading from '../loading.js';
import { USER_TYPES } from '../../db/constants.js';

const users = document.querySelector('.users');

const loading = new Loading();
loading.show();

async function main() {
    let user = await new Promise(resolve => firebase.auth().onAuthStateChanged(user => resolve(user)));
    if (!user) return alert('You are not authenticated');
    
    await new Promise(resolve => {
        firebase.database().ref(`headers/${user.uid}`).on('value', snap => {
            users.innerHTML = '';
            snap.forEach(async e => {
                console.log(e);
                let header = e.val();
                let userData = await getUserById(e.key);
                users.innerHTML += `
                <div class="user" onclick="location = 'direct.html?target=${e.key}'">
                    <div class="imgContainer">
                        <img src="../../assets/account.png">
                    </div>
                    <div class="contentContainer">
                        <div class="topInfo">
                            <span class="username">${userData.type === USER_TYPES.DOCTOR ? 'Dr. ' + userData.firstName + ' ' + userData.lastName : userData.firstName + ' ' + userData.lastName}</span>
                            <span class="time">${header.lastTime}</span>
                        </div>
                        <span class="message">${header.lastMessage}</span>
                    </div>
                </div>
                `;
            });
            resolve();
        });
    });
    loading.hide();
}

async function getUserById(id) {
    let user = await firebase.firestore().collection('users').doc(id).get();
    return user.data();
}

main();