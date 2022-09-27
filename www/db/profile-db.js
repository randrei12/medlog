firebase.auth().onAuthStateChanged((user) => {
  if (user) LoadProfile(user.uid);
  else location = "../../index.html";
});

function LoadProfile(uid) {
  const userDataRef = firebase.firestore().collection("users").doc(uid);

  userDataRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const userData = doc.data();
        console.log(document.getElementById("update-profile"));

        document.getElementById("update-profile").onsubmit = (event) => {
          event.preventDefault();

          const firstName = event.target["firstName"].value;
          const lastName = event.target["lastName"].value;
          const gender = event.target["gender"].value;
          const birthday = event.target["birthdate"].value;
          const city = event.target["city"].value;
          const county = event.target["county"].value;

          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .update({
              firstName,
              lastName,
              gender,
              birthday,
              city,
              county,
            })
            .then(() => {
                sessionStorage.removeItem('user');
                alert("account updated");
                location = 'home.html'
            });
          return false;
        };

        //accountCard.innerHTML = accountContent;
      } else {
        loading.hide();
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
      loading.hide();
    });
}