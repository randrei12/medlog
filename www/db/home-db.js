import Loading from "../js/loading.js";

const loading = new Loading();
loading.show();
firebase.auth().onAuthStateChanged((user) => {
  loading.hide();
  if (!user) location = "signUp.html";
});
