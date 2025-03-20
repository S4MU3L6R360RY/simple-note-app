// Selecting elements
const newNoteBtn = document.getElementById("new-note-btn");
const notesList = document.getElementById("notes-list");
const noteTitle = document.getElementById("note-title");
const noteContent = document.getElementById("note-content");
const noteTimestamp = document.getElementById("note-timestamp");

// Load notes from local storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let activeNoteId = localStorage.getItem("activeNoteId");

// Function to save notes to local storage
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Function to save active note index
function saveActiveNoteId() {
    localStorage.setItem("activeNoteId", activeNoteId);
}

// Function to render notes in the sidebar
function renderNotes() {
    notesList.innerHTML = "";
    notes.forEach((note, index) => {
        const listItem = document.createElement("li");

        // Create delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "✖";
        deleteBtn.classList.add("delete-note-btn");
        deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteNote(index);
        });

        // Note title in sidebar
        const noteSpan = document.createElement("span");
        noteSpan.classList.add("note-title");
        noteSpan.textContent = note.title || "Untitled Note";
        noteSpan.addEventListener("click", () => selectNote(index));

        // Append elements
        listItem.appendChild(deleteBtn);
        listItem.appendChild(noteSpan);
        notesList.appendChild(listItem);
    });
}

// Function to select a note
function selectNote(index) {
    activeNoteId = index;
    noteTitle.value = notes[index].title;
    noteContent.value = notes[index].content;
    noteTimestamp.textContent = `Last updated: ${notes[index].updatedAt}`;
    saveActiveNoteId();
}

// Function to create a new note
newNoteBtn.addEventListener("click", () => {
    const newNote = {
        title: "",
        content: "",
        createdAt: new Date().toLocaleString(),
                            updatedAt: new Date().toLocaleString(),
    };
    notes.push(newNote);
    activeNoteId = notes.length - 1;
    saveNotes();
    saveActiveNoteId();
    renderNotes();
    selectNote(activeNoteId);
});

// Function to update a note
function updateNote() {
    if (activeNoteId !== null) {
        notes[activeNoteId].title = noteTitle.value;
        notes[activeNoteId].content = noteContent.value;
        notes[activeNoteId].updatedAt = new Date().toLocaleString();
        saveNotes();
        renderNotes();
    }
}

// Function to delete a note
function deleteNote(index) {
    const confirmDelete = confirm("Are you sure you want to delete this note?");
    if (confirmDelete) {
        notes.splice(index, 1);
        if (activeNoteId === index) {
            noteTitle.value = "";
            noteContent.value = "";
            noteTimestamp.textContent = "";
            activeNoteId = null;
        }
        saveNotes();
        renderNotes();
    }
}

// Auto-save when user types in the note
noteTitle.addEventListener("input", updateNote);
noteContent.addEventListener("input", updateNote);

// Initialize app
renderNotes();

// Restore last active note
if (activeNoteId !== null && notes.length > 0) {
    activeNoteId = parseInt(activeNoteId);
    selectNote(activeNoteId);
}
