import '../db/config.js';
import { getLoggedUser } from '../js/Utils.js';

(async () => {
    const user = await getLoggedUser();
    if (!user) location = "../../index.html";

    const reformatEvents = [];
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
            initialDate: new Date(),
            weekNumbers: false,
            navLinks: false, // can click day/week names to navigate views
            editable: false,
            selectable: true,
            nowIndicator: true,
            events: reformatEvents
        });
        calendar.render();
    })
})();
