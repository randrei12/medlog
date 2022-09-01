let appointments = [
    {
        title: "Shortsync",
        start: '2022-08-10',
    },
    {
        title: "Woofdiet",
        start: '2022-08-11',
    },
    {
        title: "Linklyft",
        start: '2022-08-12',
    },
    {
        title: "Shortsync",
        start: '2022-07-10',
    }
]


document.addEventListener('DOMContentLoaded', function () {
            


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
        initialDate: '2022-08-01',
        weekNumbers: true,
        navLinks: true, // can click day/week names to navigate views
        editable: false,
        selectable: true,
        nowIndicator: true,
        events: appointments
    });
    calendar.render();

});
