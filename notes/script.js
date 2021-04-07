const newNoteEl = document.querySelector("div.new-note-area");
const newNoteBtn = document.getElementById("add-button");
const exitNoteBtn = document.getElementById("exit-note-button");
const saveNoteBtn = document.getElementById("save-note_button");
const deleteBtn = document.getElementById("delete-button");

const notesArray = [];
class Note {
    constructor(text) {
        this.text = `${text}`;
        this.color = "rgb(255, 255, 90)";
    }
}

newNoteBtn.addEventListener('click', () => {
    if(deleteBtn.classList.contains('active')) {
        deleteBtn.classList.toggle('active');
        removeDeleteButtons();
    }
    newNoteEl.style.display = 'flex'
})

exitNoteBtn.addEventListener('click', () => {
    newNoteEl.style.display = 'none'
})

saveNoteBtn.addEventListener('click', () => {
    const newNoteTextareaEl = document.querySelector('textarea');
    if(newNoteTextareaEl.value != '') {
        let newNote = new Note(newNoteTextareaEl.value)
        newNoteTextareaEl.value = '';
        addNoteDiv(newNote);
    }
    newNoteEl.style.display = 'none'
})

function addNoteDiv(note) {
    const notesAreaEl = document.querySelector('div.notes-area');
    const noteEl = document.createElement('div');
    noteEl.className = 'note';
    noteEl.setAttribute('style', `background-color: ${note.color}`);
    noteEl.innerText = note.text;   
    notesAreaEl.appendChild(noteEl);
}

deleteBtn.addEventListener('click', () => {
    deleteBtn.classList.toggle('active');
    if(deleteBtn.classList.contains('active')) {
        addDeleteButtons();
    } else {
        removeDeleteButtons();
    }
})

function addDeleteButtons() {
    const notes = [...document.getElementsByClassName('note')];
    const notesAreaEl = document.querySelector('div.notes-area');
    if(notes.length > 0) {
        notes.forEach(note => {
            let deleteEl = note.querySelectorAll('button.delete-note-button');
            if(deleteEl.length == 0) {
                deleteEl = document.createElement('button');
                deleteEl.className = 'delete-note-button';
                deleteEl.innerHTML = '<i class="fas fa-trash-alt fa-3x"></i>';
                deleteEl.addEventListener('click', () => {
                    notesAreaEl.removeChild(note);
                    if(notesAreaEl.children.length == 0) {
                        deleteBtn.classList.toggle('active');
                    }
                })
                note.appendChild(deleteEl);
            }
        });
    }
}

function removeDeleteButtons() {
    const notes = [...document.getElementsByClassName('note')];
    if(notes.length > 0) {
        notes.forEach(note => {
            let deleteEl = note.querySelector('button.delete-note-button');
            if(deleteEl != undefined) {
                note.removeChild(deleteEl);
            }
        });
    }
}