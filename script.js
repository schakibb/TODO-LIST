
const notes = [];
const notesList = document.querySelector(".notes-list")
const newNoteWindow = document.querySelector(".new-note-window")
const overlay = document.querySelector(".overlay")
const addBtn = document.querySelector(".add-btn")
const cancelBtn = document.querySelector(".cancel-btn")
const applyBtn = document.querySelector(".apply-btn")
const newNoteInput = document.querySelector(".new-note-input")
const statusSelect = document.querySelector("#status-select");
const searchInput = document.querySelector('.search-input')


class note {
    constructor(noteName) {
        this.noteName = noteName;
        this.isCoomplete = false;
        this.createNote();
    }

    createNote() {
        let divNoteItem = document.createElement("div");
        divNoteItem.classList.add("note-item");

        let inputCheckBox = document.createElement("input");
        inputCheckBox.type = "checkbox";
        inputCheckBox.checked = this.isCoomplete;

        let inputNoteText = document.createElement("input");
        inputNoteText.type = "text";
        inputNoteText.classList.add("note-text");
        inputNoteText.value = this.noteName;
        inputNoteText.disabled = true;

        let divIcons = document.createElement("div");
        divIcons.classList.add("icons");

        let buttonIcon1 = document.createElement("button");
        buttonIcon1.innerHTML = "✏️";
        buttonIcon1.classList.add("icon");

        let buttonIcon2 = document.createElement("button");
        buttonIcon2.innerHTML = "🗑️";
        buttonIcon2.classList.add("icon");

        divIcons.appendChild(buttonIcon1);
        divIcons.appendChild(buttonIcon2);

        notesList.appendChild(divNoteItem);

        divNoteItem.appendChild(inputCheckBox);
        divNoteItem.appendChild(inputNoteText);
        divNoteItem.appendChild(divIcons);
        divNoteItem.appendChild(document.createElement("br"));

        buttonIcon1.addEventListener("click", () => this.edit(inputNoteText));
        buttonIcon2.addEventListener("click", () => this.remove(divNoteItem));
        inputCheckBox.addEventListener("change", () => this.toggleComplete(inputCheckBox.checked));
    }

    edit(input) {
        input.disabled = !input.disabled;

        if (!input.disabled) {
            input.focus()
        } else {
            if (input.value.trim() !== "") {
                this.noteName = input.value;
            } else {
                input.value = this.noteName;

            }
        }

    }

    getNoteNameLowerCase() {
        return this.noteName.toLowerCase()
    }


    remove(item) {
        notesList.removeChild(item); // Remove from the DOM
        notes.splice(notes.indexOf(this), 1); // Remove from the array using the correct index
        filterNotes(); // Refresh the displayed notes
    }

    toggleComplete(isChecked) {
        this.isCoomplete = isChecked;
        filterNotes(); // Reapply filter if needed
    }
}


function filterNotes() {
    let filterValue = statusSelect.value;

    let notes1 = notes.filter(value => {
        if (filterValue === 'all') return true;
        if (filterValue === 'complete' && value.isCoomplete) return true;
        if (filterValue === 'incomplete' && !value.isCoomplete) return true;
        return false;
    });

    notesList.innerHTML = "";


    if (notes1.length === 0) {
        let img = document.createElement("img");
        img.classList.add("empty-state");
        img.src = 'Detective-check-footprint 1.svg';
        img.alt = "Empty";

        let p = document.createElement("p");
        p.textContent = "Empty...";

        notesList.appendChild(img);
        notesList.appendChild(p);
    } else {

        notes1.forEach(value => value.createNote());
    }
}


function addNewNote() {
    if (newNoteInput.value != "") {
        notes.push(new note(newNoteInput.value))
        closeNewNoteWindow()
        filterNotes()
    }
}


function openNewNoteWindow() {
    newNoteWindow.classList.remove("hidden")
    overlay.classList.remove("hidden")
}


function closeNewNoteWindow() {
    newNoteInput.value = ""
    newNoteWindow.classList.add("hidden")
    overlay.classList.add("hidden")
}


function searchInNotes() {
    let searchInputValue = searchInput.value
    let notes1 = notes.filter(value => value.getNoteNameLowerCase().startsWith(searchInputValue.toLowerCase()))

    notesList.innerHTML = "";

    if (notes1.length === 0) {
        let img = document.createElement("img");
        img.classList.add("empty-state");
        img.src = 'Detective-check-footprint 1.svg';
        img.alt = "Empty";

        let p = document.createElement("p");
        p.textContent = "Empty...";

        notesList.appendChild(img);
        notesList.appendChild(p);
    } else {
        notes1.forEach(value => value.createNote());
    }

}


filterNotes()

searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        searchInNotes()
    }
})


overlay.addEventListener("click", closeNewNoteWindow)
addBtn.addEventListener("click", openNewNoteWindow)
cancelBtn.addEventListener("click", closeNewNoteWindow)
applyBtn.addEventListener("click", addNewNote)
statusSelect.addEventListener("change", filterNotes)
newNoteInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addNewNote()
    }
})

