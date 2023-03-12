// Hide add form, leaders & assemblers at the beginning
const todoForm = document.getElementById("todo-form");
todoForm.style.display = "none";
const leader1 = document.getElementById("leader1");
const leader2 = document.getElementById("leader2");
leader1.style.display = "none";
leader2.style.display = "none";
document.body.style.overflow = "hidden";
var hHidden = true;

function hideTempButtons() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    const removeButton = task.querySelector(".task-actions:first-of-type");
    const editButton = task.querySelector(".task-actions:last-of-type");
    if (removeButton && editButton) {
      if (removeButton.style.display === "none") {
        removeButton.style.display = "inline-block"; // change to inline-block
        editButton.style.display = "inline-block"; // change to inline-block
      } else {
        removeButton.style.display = "none";
        editButton.style.display = "none";
      }
    }
  });
  
}

const lanes = document.querySelector(".lanes");
const gapValue = getComputedStyle(lanes).getPropertyValue('gap'); // Get CSS gap value between lanes
const hamburgerButton = document.getElementById("hamburger-button");
const tempLane = document.getElementById("temp-lane");
hamburgerButton.addEventListener("click", () => {
  if (todoForm.style.display === "none") {
	lanes.style.gap = "4px"; // Set editing mode gap value
    document.body.style.overflow = "auto";
    todoForm.style.display = "block";
    tempLane.style.display = "block";
    leader1.style.display = "block";
    leader2.style.display = "block";
    hideTempButtons();
	hHidden = false;
  } else {
	lanes.style.gap = gapValue; // Return to previous gap
    document.body.style.overflow = "hidden";
    todoForm.style.display = "none";
    tempLane.style.display = "none";
    leader1.style.display = "none";
    leader2.style.display = "none";
    hideTempButtons();
	hHidden = true;
  }
});

// Click hamburger icon when the editing mode has been turned on for too long
function clickButton() {
  hamburgerButton.click();
  hHidden = true;
}

setInterval(function() {
  if (!hHidden) {
    clickButton();
  }
}, 300000); // execute every 5 minutes

// Character limit in inputs
const input = document.getElementById("todo-input");
const taskDesc = document.getElementById("task-desc");
const inputs = document.querySelectorAll('input, textarea');
const maxCharacters = 16;

inputs.forEach(input => {
  input.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    if (inputValue.length > maxCharacters) {
      event.target.value = inputValue.slice(0, maxCharacters);
    }
  });
});

// New Task actions and dragging
const form = document.getElementById("todo-form");
form.setAttribute('spellcheck', 'false'); // Disable spellcheck
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  // Capitalize first letter of task text
  const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.classList.add("small-task"); // Set smaller width
  newTask.setAttribute("draggable", "true");

  const taskTextContainer = document.createElement("div");
  taskTextContainer.classList.add("task-text-container");

  const taskText = document.createElement("p");
  taskText.innerText = capitalizedValue;
  taskText.contentEditable = true; // Set contentEditable to true from the start

  const removeButton = document.createElement("button");
  removeButton.innerText = "X";
  removeButton.classList.add("task-actions");
  removeButton.addEventListener("click", () => {
    newTask.remove();
  });

  const editButton = document.createElement("button");
  editButton.innerText = "Edytuj";
  editButton.classList.add("task-actions");
  editButton.addEventListener("click", () => {
  taskText.focus();
  taskText.innerText = capitalizedValue;
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(removeButton);

  taskTextContainer.appendChild(taskText);
  taskTextContainer.appendChild(buttonContainer);
  newTask.appendChild(taskTextContainer);

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
    newTask.classList.add("task");
  });

  tempLane.appendChild(newTask);

  input.value = "";
});