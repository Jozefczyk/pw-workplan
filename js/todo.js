const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const tempLane = document.getElementById("temp-lane");
const leader1 = document.getElementById("leader1");
const leader2 = document.getElementById("leader2");
const swimLane = document.querySelectorAll(".swim-lane");

const todoForm = document.getElementById("todo-form");
const hamburgerButton = document.getElementById("hamburger-button");

// Hide add form, leaders & assemblers at the beginning
todoForm.style.display = "none";
leader1.style.display = "none";
leader2.style.display = "none"; 
document.body.style.overflow = "hidden";

hamburgerButton.addEventListener("click", () => {
  if (todoForm.style.display === "none") {
	document.body.style.overflow = "overflow";
    todoForm.style.display = "block";
    tempLane.style.display = "block";
	leader1.style.display = "block";
	leader2.style.display = "block"; 
	removeButton.style.display = "block";
  } else {
	document.body.style.overflow = "hidden";
    todoForm.style.display = "none";
    tempLane.style.display = "none";
	leader1.style.display = "none";
	leader2.style.display = "none"; 
	removeButton.style.display = "none";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  
  const taskText = document.createElement("p");
  taskText.innerText = value;
  
  const removeButton = document.createElement("button");
  removeButton.innerText = "X";
  removeButton.classList.add("task-actions");
  removeButton.addEventListener("click", () => {
    newTask.remove();
  });
  
  newTask.appendChild(taskText);
  newTask.appendChild(removeButton);

	const editButton = document.createElement("button");
	editButton.innerText = "Edit";
	editButton.classList.add("task-actions");
	editButton.addEventListener("click", () => {
	  taskText.contentEditable = true;
	  taskText.focus();
	});

newTask.appendChild(editButton);

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
	    newTask.classList.add('task');
  });

  tempLane.appendChild(newTask);

  input.value = "";
});

swimLane.addEventListener("mouseover", (e) => {
  const target = e.target;
  if (target.classList.contains("task")) {
    const removeButton = target.querySelector(".remove-button");
    if (removeButton) {
      removeButton.style.display = "block";
    } else {
      const newRemoveButton = document.createElement("button");
      newRemoveButton.innerText = "X";
      newRemoveButton.classList.add("remove-button");
      newRemoveButton.style.display = "block";
      newRemoveButton.addEventListener("click", () => {
        target.remove();
      });
      target.appendChild(newRemoveButton);
    }
  }
});

swimLane.addEventListener("mouseout", (e) => {
  const target = e.target;
  if (target.classList.contains("task")) {
    const removeButton = target.querySelector(".remove-button");
    if (removeButton) {
      removeButton.style.display = "none";
    }
  }
});

newTask.addEventListener("mouseover", () => {
  removeButton.style.display = "block";
});

newTask.addEventListener("mouseout", () => {
  removeButton.style.display = "none";
});