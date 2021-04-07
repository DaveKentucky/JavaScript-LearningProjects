const newNoteEl = document.querySelector("div.edit-note-area");
const newNoteBtn = document.getElementById("add-button");
const exitNoteBtn = document.getElementById("exit-note-button");
const saveNoteBtn = document.getElementById("save-note_button");
const deleteBtn = document.getElementById("delete-button");

let noteIndex = 1;
let currentNoteId = 0;

const notesArray = [];
class Note {
    constructor(text) {
        this.id = noteIndex;
        noteIndex++;
        this.text = `${text}`;
        this.color = "rgb(255, 255, 90)";
    }
}

newNoteBtn.addEventListener('click', () => {
    if(deleteBtn.classList.contains('active')) {
        deleteBtn.classList.toggle('active');
        removeDeleteButtons();
    }
    deleteBtn.disabled = true;
    newNoteEl.style.display = 'flex'
})

exitNoteBtn.addEventListener('click', () => {
    newNoteEl.style.display = 'none'
})

saveNoteBtn.addEventListener('click', () => {
    const newNoteTextareaEl = document.querySelector('textarea');
    if(newNoteTextareaEl.value != '') {
        let note;
        if(currentNoteId > 0) {
            note = notesArray.find(n => n.id == currentNoteId);
            note.text = newNoteTextareaEl.value;
        } else {
            note = new Note(newNoteTextareaEl.value)
            notesArray.push(note);
        }
        newNoteTextareaEl.value = '';
        addNoteDiv(note);
    }
    deleteBtn.disabled = false;
    newNoteEl.style.display = 'none'
})

function addNoteDiv(note) {
    const allNotes = [...document.querySelectorAll('div.note')];
    let noteEl;
    if(allNotes.length > 0) {
        noteEl = allNotes.find(n => n.id == note.id);
    }
    if(noteEl == undefined) {
        const notesAreaEl = document.querySelector('div.notes-area');
        const noteEl = document.createElement('div');
        noteEl.className = 'note';
        noteEl.setAttribute('style', `background-color: ${note.color}`);
        noteEl.id = note.id;
        noteEl.innerText = note.text;
        noteEl.addEventListener('click', () => {
            const textareaEl = document.querySelector('textarea');
            textareaEl.value = noteEl.innerText;
            currentNoteId = parseInt(noteEl.id);
            newNoteEl.style.display = 'flex';
        })   
        notesAreaEl.appendChild(noteEl);
    } else {
        noteEl.innerText = note.text;
    }
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