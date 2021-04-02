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
        console.log(this.text);
    }
}

newNoteBtn.addEventListener('click', () => {
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
    noteEl.innerHTML = note.text;   
    notesAreaEl.appendChild(noteEl);
}

deleteBtn.addEventListener('click', () => {
    const notes = [...document.getElementsByClassName('note')];
    notes.forEach(note => {
        let deleteEl = document.createElement('button');
        deleteEl.className = 'delete-note-button';
        deleteEl.innerHTML = '<i class="fas fa-trash-alt fa-3x"></i>';
        
        note.appendChild(deleteEl);
    });
})