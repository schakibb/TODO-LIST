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
       
    }


    remove(item) {
    }

    toggleComplete(isChecked) {
    }
}