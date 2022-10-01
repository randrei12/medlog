const firebaseConfig = {
    apiKey: "AIzaSyCC1TTaWpCU4bxhBD2l7ueviKKP1eskrpM",
    authDomain: "medlog-9650b.firebaseapp.com",
    databaseURL: "https://medlog-9650b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "medlog-9650b",
    storageBucket: "medlog-9650b.appspot.com",
    messagingSenderId: "955776050336",
    appId: "1:955776050336:web:7b7e3a9cb38de68d3695c5",
    measurementId: "G-424MJM444P",
};

firebase.initializeApp(firebaseConfig);

window.onload = () => {



    firebase.auth().onAuthStateChanged((user) => {
        if (user) {

            const reformatEvents = [];

            console.log(user.uid)
            const result = firebase.firestore().collection("appointments").doc(user.uid).get();
            result.then((data) => {
                data.data()["appointments"].forEach(appointment => {
                    reformatEvents.push({
                        start: `${appointment["date"]}T${appointment["time"]}:00`,
                        end: `${appointment["date"]}T${appointment["time"] + 1}:00`,
                        time: appointment["time"],
                        title: "ben"
                    })
                });
                var calendarEl = document.getElementById('calendar');
                console.log(reformatEvents);
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    },

                    selectable: true,
                    selectMirror: true,
                    select: function (arg) {
                        var title = prompt('Event Title:');
                        if (title) {
                            calendar.addEvent({
                                title: title,
                                start: arg.start,
                                end: arg.end,
                                allDay: arg.allDay
                            })
                        }
                        calendar.unselect()
                    },

                    editable: true,
                    droppable: true, // this allows things to be dropped onto the calendar
                    drop: function (arg) {
                        // is the "remove after drop" checkbox checked?
                        if (document.getElementById('drop-remove').checked) {
                            // if so, remove the element from the "Draggable Events" list
                            arg.draggedEl.parentNode.removeChild(arg.draggedEl);
                        }
                    },
                    initialDate: '2022-08-01',
                    weekNumbers: true,
                    navLinks: true, // can click day/week names to navigate views
                    editable: false,
                    selectable: true,
                    nowIndicator: true,
                    events: reformatEvents
                });
                calendar.render();
            })



        }
        else location = "../../index.html";
    });


}
