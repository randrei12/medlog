import Loading from "../js/loading.js";
const loading = new Loading();

const accountCard = document.getElementById("account-card");
const updateForm = document.getElementById("update-profile");

loading.show();
firebase.auth().onAuthStateChanged((user) => {
  if (user) LoadProfile(user.uid);
  else location = "../html/patient/signUp.html";
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
        loading.hide();

        document.getElementById("update-profile").onsubmit = (event) => {
          event.preventDefault();
          loading.show();

          const name = event.target["username"].value;
          const gender = event.target["gender"].value;
          const birthday = event.target["birthdate"].value;
          const city = event.target["city"].value;
          const country = event.target["county"].value;
          const familyDoctors = event.target["family-doctor"].value;

          console.log(name, gender, birthday, city, country, familyDoctors);

          firebase
            .firestore()
            .collection("users")
            .doc(uid)
            .update({
              username: name,
              gender,
              birthday: birthday,
              city,
              county: country,
              familyDoctor: familyDoctors,
            })
            .then(() => {
              loading.hide();
              alert("account updated");
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

function UpdateProfile(event, uid) {
  event.preventDefault();
  loading.show();

  const name = event.target["name"].value;
  const gender = event.target["gender"].value;
  const birthday = event.target["birthdate"].value;
  const city = event.target["city"].value;
  const country = event.target["county"].value;
  const familyDoctors = event.target["family-doctor"].value;

  firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .update({
      username: name,
      gender,
      birthday: birthday,
      city,
      county: country,
      familyDoctor: familyDoctors,
    })
    .then(() => {
      loading.hide();
    })
    .catch((error) => {
      alert("Error");
      loading.hide();
    });
}
