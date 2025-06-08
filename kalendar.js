document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.querySelector('#calendar')

    const notes = JSON.parse(localStorage.getItem('notes')) || []

    const events = notes
        .filter(note => note.date)
        .map(note => ({
            title: note.text,
            start: note.date,
            allDay: false
        }))

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        events: events,
        height: 'auto'
    })

    calendar.render()
})

