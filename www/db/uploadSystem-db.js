const fileButton = document.getElementById("file");

fileButton.addEventListener("change", (e) => {
    var file = e.target.files[0];

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) location = "signUp.html";
        
        var fileType = location.href.includes("Medical") ? "medicalFiles" : "prescriptionFiles";
        
        console.log(fileType)

        var storageRef = firebase.storage().ref(`${fileType}/${user.uid}/` + file.name);
        storageRef.put(file).then(() => {
            Swal.fire(
                'Good job!',
                'File Uploaded',
                'success'
            );
        });
    });
    

    

});