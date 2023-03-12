// Hide stuff at the beginning
document.body.style.overflow = "hidden";
var hHidden = true;
const todoForm = document.getElementById("todo-form");
todoForm.style.display = "none";
const leader1 = document.getElementById("leader1");
const leader2 = document.getElementById("leader2");
leader1.style.display = "none";
leader2.style.display = "none";

function hideTempButtons() {
  const tasks = document.querySelectorAll(".task");
  tasks.forEach(task => {
    const removeButton = task.querySelector(".task-actions:first-of-type");
    const editButton = task.querySelector(".task-actions:last-of-type");
    if (removeButton && editButton) {
      if (removeButton.style.display === "none") {
        removeButton.style.display = "inline-block";
        editButton.style.display = "inline-block";
      } else {
        removeButton.style.display = "none";
        editButton.style.display = "none";
      }
    }
  });
  
}

const board = document.querySelector(".board");
const lanes = document.querySelector(".lanes");
const gapValue = getComputedStyle(lanes).getPropertyValue("gap"); // Get current CSS gap value between lanes
const paddingTop = getComputedStyle(board).getPropertyValue("paddingTop"); // Get current CSS paddingTop value
const hamburgerButton = document.getElementById("hamburger-button");
const tempLane = document.getElementById("temp-lane");
hamburgerButton.addEventListener("click", () => {
  if (todoForm.style.display === "none") {
	lanes.style.gap = "0.42vh"; // Set editing mode gap value
	board.style.paddingTop = "0vh";
    document.body.style.overflow = "auto";
    todoForm.style.display = "block";
    tempLane.style.display = "block";
    leader1.style.display = "block";
    leader2.style.display = "block";
    hideTempButtons();
	hHidden = false;
  } else {
	lanes.style.gap = gapValue; // Return to previous gap
	board.style.paddingTop = paddingTop;
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

// Auto expand field
function autoExpand(field) {
  // Reset field height
  field.style.height = 'inherit';

  // Get the computed styles for the field
  var computed = window.getComputedStyle(field);

  // Calculate the height
  var height = parseInt(computed.getPropertyValue('border-top-width'), 8)
               + parseInt(computed.getPropertyValue('padding-top'), 8)
               + field.scrollHeight
               + parseInt(computed.getPropertyValue('padding-bottom'), 8)
               + parseInt(computed.getPropertyValue('border-bottom-width'), 8);

  field.style.height = height + 'px';
}


// New Task actions and dragging
const input = document.getElementById("todo-input");
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
	newTask.classList.remove("small-task"); 
    newTask.classList.add("task");
  });

  tempLane.appendChild(newTask);

  input.value = "";
});