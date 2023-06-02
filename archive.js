let archivedList = [];

// get archived notes from storage
const archivedNotes = localStorage.getItem("archives");
if (archivedNotes) {
  archivedList = JSON.parse(archivedNotes);
}

function deletePermanent(cnt) {
  const ind = cnt - "0";
  if (ind != -1) {
    archivedList.splice(ind, 1);
  }
  updateStorageList(archivedList);
  showArchivedNotes();
}

function showArchivedNotes() {
  let archives = "";
  let cnt = 0;
  archivedList.forEach((Element) => {
    archives += `<li class="archivedNote">
            <div id=${cnt} class="noteTitle">${Element.title}</div>
            <div class="noteContent">${Element.content}</div>
            <div class="btns">
                <div class="delete" onclick="deletePermanent('${cnt}')">Delete</div>

                <div class="archive" onclick="unArchive('${cnt}')">UnArchive</div>
            </div>
        </li>`;
    cnt++;
  });

  document.getElementById("archivedList").innerHTML = archives;
}

function updateStorageList(list) {
  localStorage.setItem("archives", JSON.stringify(list));
}

function unArchive(cnt) {
  const ind = cnt - "0";
  let notesList = [];
  let notes = localStorage.getItem("notes");
  if (notes) {
    notesList = JSON.parse(notes);
    notesList.push(archivedList[ind]);
    localStorage.setItem("notes", JSON.stringify(notesList));
    deletePermanent(cnt);
  }
}

showArchivedNotes();
