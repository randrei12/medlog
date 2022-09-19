import Loading from "../loading.js";
import firebase from '../../db/config.js';
import { USER_TYPES } from '../../db/constants.js';
import { params } from '../Utils.js';

const targetLabel = document.querySelector('.userData > span');
const messagesContainer = document.querySelector('.messagesContainer');
const [ messageInput, sendButton ] = document.querySelector('.sendContainer').children;

Capacitor.Plugins.StatusBar.setBackgroundColor({color: "#657ef2"});
Capacitor.Plugins.StatusBar.setOverlaysWebView({overlay: false});
const loading = new Loading();
loading.show();

async function main() {
    let user = await new Promise(resolve => firebase.auth().onAuthStateChanged(user => resolve(user)));
    if (!user) return alert('You are not authenticated');

    //set top details
    let target = await getUserById(params.target);
    targetLabel.innerText = target.type === USER_TYPES.DOCTOR ? `Dr. ${target.firstName} ${target.lastName}` : `${target.firstName} ${target.lastName}`;

    //get the channel id
    let channelID = await new Promise(resolve => {
        firebase.database().ref(`headers/${user.uid}/${target.uid}`).once('value').then(snap => {
            resolve(snap.val().channel);
        });
    });
    
    //set the channel
    let channel = firebase.database().ref(`channels/${channelID}`);

    sendButton.onclick = () => {
        let text = messageInput.value.trim();
        let date = new Date();
        let time = `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
        if (text === '') return;
        channel.push({
            sender: user.uid,
            time,
            text
        });

        firebase.database().ref(`headers/${user.uid}/${target.uid}`).update({
            lastMessage: text,
            lastTime: time
        });

        firebase.database().ref(`headers/${target.uid}/${user.uid}`).update({
            lastMessage: text,
            lastTime: time
        });
        messageInput.value = '';
    }

    //
    channel.on('value', snap => {
        if (!snap.val()) return;
        messagesContainer.innerHTML = '';
        snap.forEach(message => {
            let mess = message.val();
            messagesContainer.innerHTML += `
            <div class="message ${mess.sender === user.uid ? 'right' : 'left'}">
                <div>
                    <span>${mess.text}</span>
                </div>
                <div class="time">
                    <span>${mess.time}</span>
                </div>
            </div>
            `
        });
    });

    loading.hide();
}

async function getUserById(id) {
    let user = await firebase.firestore().collection('users').doc(id).get();
    return user.data();
}

main();