document.addEventListener('DOMContentLoaded', () => {
    const trashList = document.querySelector('#trash-list')
    let trashNotes = JSON.parse(localStorage.getItem('trashNotes')) || []

    const now = Date.now()
    const sevenDays = 7 * 24 * 60 * 60 * 1000

   
    trashNotes = trashNotes.filter(note => {
        if (!note.date) return true
        const time = new Date(note.date).getTime()
        return now - time < sevenDays
    })

    localStorage.setItem('trashNotes', JSON.stringify(trashNotes))

    trashNotes.forEach((note, index) => {
        const noteDiv = document.createElement('div')
        noteDiv.className = 'note'

        const text = document.createElement('textarea')
        text.value = note.text
        text.disabled = true
        text.classList.add('note-text')

        const buttonContainer = document.createElement('div')
        buttonContainer.className = 'button-container'

        const restoreBtn = document.createElement('button')
        restoreBtn.innerHTML = '♻️'
        restoreBtn.className = 'restore-button'
        restoreBtn.addEventListener('click', () => {
            restoreNote(index)
        })

        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = '🗑️'
        deleteBtn.className = 'delete-button'
        deleteBtn.addEventListener('click', () => {
            deleteNote(index)
        })

        buttonContainer.appendChild(restoreBtn)
        buttonContainer.appendChild(deleteBtn)

        noteDiv.appendChild(text)
        noteDiv.appendChild(buttonContainer)
        trashList.appendChild(noteDiv)
    })

    function restoreNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || []
        notes.push(trashNotes[index])
        localStorage.setItem('notes', JSON.stringify(notes))

        trashNotes.splice(index, 1)
        localStorage.setItem('trashNotes', JSON.stringify(trashNotes))
        location.reload()
    }

    function deleteNote(index) {
        trashNotes.splice(index, 1)
        localStorage.setItem('trashNotes', JSON.stringify(trashNotes))
        location.reload()
    }
})

