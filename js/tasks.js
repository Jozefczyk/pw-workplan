// Draggables
const draggables = document.querySelectorAll(".task");
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

//Droppables
const droppables = document.querySelectorAll(".swim-lane");

droppables.forEach((zone) => {
zone.addEventListener("dragover", (e) => {
e.preventDefault();

const tasks = Array.from(zone.querySelectorAll(".task:not(.is-dragging)"));
const afterTask = tasks.reduce(
  (closest, task) => {
    const rect = task.getBoundingClientRect();
    const offset = e.clientY - rect.top - rect.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, task: task };
    } else {
      return closest;
    }
  },
  { offset: Number.NEGATIVE_INFINITY }
).task;

const currentTask = document.querySelector(".is-dragging");

if (afterTask === null) {
  zone.appendChild(currentTask);
} else {
  zone.insertBefore(currentTask, afterTask);
}
});
});

// Get all elements with class "task"
const tasks = document.querySelectorAll('.task');

// Add event listener to each task element
tasks.forEach(task => {
  task.addEventListener('dragstart', () => {
    // When the task is dragged, change its class to "task task-inline"
    //task.classList.add('task-inline');
	task.classList.add('task');
  });
  
});

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
  removeButton.innerText = "❌";
  removeButton.classList.add("task-actions");
  removeButton.addEventListener("click", () => {
    newTask.remove();
  });

  const editButton = document.createElement("button");
  editButton.innerText = "✏️";
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