import firebase from "../../db/config.js";
import Loading from "../loading.js";
import { getLoggedUser } from "../Utils.js";

const historyList = document.querySelector('.historyList');

// firebase.storage().ref()