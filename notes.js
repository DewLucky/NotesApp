const inputTitle = document.getElementById("title");
const inputContent = document.getElementById("content");
const addBtn = document.getElementById("addNote");
const alert = document.getElementById('alert-message');
const alertOff = document.getElementById("alert-off")
const container = document.getElementsByClassName("container")[0];
const alertBackground = document.getElementById("alertBackground");

let notes = [];
let archivedList = [];

// get notes from storage
const storedNotes = localStorage.getItem("notes");
if (storedNotes) {
  notes = JSON.parse(storedNotes);
  showNotes();
}

// get archived notes from storage
const archivedNotes = localStorage.getItem("archives");
if (archivedNotes) {
  archivedList = JSON.parse(archivedNotes);
}


// Add Note
function addNote() {
  if (inputContent.value === "") {
    alert.style.display = "block";
    alertBackground.style.display = "block"
    return;
  }

  const noteObj = {
    title: inputTitle.value === "" ? "Title1" : inputTitle.value,
    content: inputContent.value,
  };

  const editIndex = notes.findIndex((note) => note.title === noteObj.title);
  if (editIndex !== -1) {
    notes.splice(editIndex, 1, noteObj); // Replace the existing note
  } else {
    notes.push(noteObj); // Add a new note
  }

  inputTitle.value = "";
  inputContent.value = "";
  showNotes();
}


// Display Notes
function showNotes() {
  let notesList = "";
  let cnt = 0;
  notes.forEach((Element) => {
    notesList += `<div class="note">
            <div id=${cnt} class="noteTitle">${Element.title}</div>
            <div class="noteContent">${Element.content}</div>
            <div class="btns"> 
            <div class="edit" onclick="editNote('${cnt}')">Edit</div>
            <div class="delete" onclick="deleteNote('${cnt}')">Delete</div>

            <div class="archive" onclick="archiveNote('${cnt}')">Archive</div>
            </div>
        </div>`;
    cnt++;
  });
  document.getElementById("notesList").innerHTML = notesList;

  // update the local Storage
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Delele Note
function deleteNote(index) {
  const ind = index - "0";
  if (ind != -1) {
    notes.splice(ind, 1);
    showNotes();
  }
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Archive Note
function archiveNote(ind) {
  let index = ind - "0";

  archivedList.push(notes[index]);
  deleteNote(ind);
  showNotes();
  localStorage.setItem("archives", JSON.stringify(archivedList));
}

// Edit note
function editNote(index) {
    const ind = index - "0";
    if (ind !== -1) {
      const noteObj = notes[ind];
      inputTitle.value = noteObj.title;
      inputContent.value = noteObj.content;
    }
  }

addBtn.addEventListener("click", addNote);
alertOff.addEventListener("click", offTheAlert);

function offTheAlert(){
    alert.style.display = "none"
    alertBackground.style.display = "none"
}