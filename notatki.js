document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.querySelector('#notes-list')
    const newNoteInput = document.querySelector('#new-note')
    const addNoteButton = document.querySelector('#add-note')
    const noteDateInput = document.querySelector('#note-date')
    const searchInput = document.querySelector('.search')

    let notes = JSON.parse(localStorage.getItem('notes')) || []

    function updateNotesList(filteredNotes = notes) {
        notesList.innerHTML = ''

        filteredNotes.forEach((note, index) => {
            const noteDiv = document.createElement('div')
            noteDiv.className = 'note'
            if (note.completed) noteDiv.classList.add('completed')

            const textArea = document.createElement('textarea')
            textArea.value = note.text
            textArea.addEventListener('input', () => {
                notes[index].text = textArea.value
                localStorage.setItem('notes', JSON.stringify(notes))
            })

            const buttons = document.createElement('div')
            buttons.className = 'button-container'

            const doneBtn = document.createElement('button')
            doneBtn.textContent = '✅'
            doneBtn.addEventListener('click', () => {
                notes[index].completed = !notes[index].completed
                localStorage.setItem('notes', JSON.stringify(notes))
                updateNotesList()
            })

            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = '🗑️'
            deleteBtn.className = 'delete-button'
            deleteBtn.addEventListener('click', () => {
                moveToTrash(index)
            })

            buttons.appendChild(doneBtn)
            buttons.appendChild(deleteBtn)
            noteDiv.appendChild(textArea)
            noteDiv.appendChild(buttons)
            notesList.appendChild(noteDiv)
        })
    }

    function moveToTrash(index) {
        const trashNotes = JSON.parse(localStorage.getItem('trashNotes')) || []
        const noteToTrash = notes[index]

        trashNotes.push(noteToTrash)
        localStorage.setItem('trashNotes', JSON.stringify(trashNotes))

        notes.splice(index, 1)
        localStorage.setItem('notes', JSON.stringify(notes))
        updateNotesList()
    }

    addNoteButton.addEventListener('click', () => {
        const text = newNoteInput.value.trim()
        const dateValue = noteDateInput.value
        const date = dateValue ? new Date(dateValue).toISOString() : null

        if (text) {
            notes.push({ text, date, completed: false })
            localStorage.setItem('notes', JSON.stringify(notes))
            newNoteInput.value = ''
            noteDateInput.value = ''
            updateNotesList()
        }
    })

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase()
        const filtered = notes.filter(note => note.text.toLowerCase().includes(query))
        updateNotesList(filtered)
    })

    updateNotesList()
})

