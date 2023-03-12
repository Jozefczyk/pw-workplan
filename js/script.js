const draggables = document.querySelectorAll(".task");
draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

const droppables = document.querySelectorAll(".swim-lane");
droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const [bottomTask, topTask, leftTask, rightTask] = insertTask(zone, e.clientX, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask && !topTask && !leftTask && !rightTask) {
      zone.appendChild(curTask);
    } else if (bottomTask && !topTask && !leftTask && !rightTask) {
      zone.insertBefore(curTask, bottomTask.nextSibling);
    } else if (!bottomTask && topTask && !leftTask && !rightTask) {
      zone.insertBefore(curTask, topTask);
    } else if (!bottomTask && !topTask && leftTask && !rightTask) {
      zone.insertBefore(curTask, leftTask);
    } else if (!bottomTask && !topTask && !leftTask && rightTask) {
      zone.insertBefore(curTask, rightTask.nextSibling);
    } else {
      let closestTask = null;
      let minDistance = Infinity;

      if (bottomTask) {
        const bottomDistance = bottomTask.getBoundingClientRect().top - e.clientY;
        if (bottomDistance < minDistance) {
          minDistance = bottomDistance;
          closestTask = bottomTask;
        }
      }

      if (topTask) {
        const topDistance = e.clientY - topTask.getBoundingClientRect().bottom;
        if (topDistance < minDistance) {
          minDistance = topDistance;
          closestTask = topTask;
        }
      }

      if (leftTask) {
        const leftDistance = e.clientX - leftTask.getBoundingClientRect().right;
        if (leftDistance < minDistance) {
          minDistance = leftDistance;
          closestTask = leftTask;
        }
      }

      if (rightTask) {
        const rightDistance = rightTask.getBoundingClientRect().left - e.clientX;
        if (rightDistance < minDistance) {
          minDistance = rightDistance;
          closestTask = rightTask;
        }
      }

      if (closestTask === bottomTask) {
        zone.insertBefore(curTask, bottomTask.nextSibling);
      } else if (closestTask === topTask) {
        zone.insertBefore(curTask, topTask);
      } else if (closestTask === leftTask) {
        zone.insertBefore(curTask, leftTask);
      } else {
        zone.insertBefore(curTask, rightTask.nextSibling);
      }
    }
  });
});

// Current date
const dateElement = document.querySelector(".date");
const options = { weekday: 'long', month: 'long', day: 'numeric' };
const today = new Date();
dateElement.textContent = today.toLocaleDateString('pl-PL', options);

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

const insertTask = (zone, mouseX, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestBottomTask = null;
  let closestTopTask = null;
  let closestLeftTask = null;
  let closestRightTask = null;
  let closestOffsetBottom = Number.NEGATIVE_INFINITY;
  let closestOffsetTop = Number.POSITIVE_INFINITY;
  let closestOffsetLeft = Number.POSITIVE_INFINITY;
  let closestOffsetRight = Number.POSITIVE_INFINITY;

  els.forEach((task) => {
    const { top, bottom, left, right } = task.getBoundingClientRect();

    const offsetBottom = mouseY - bottom;
    const offsetTop = mouseY - top;
    const offsetLeft = mouseX - left;
    const offsetRight = mouseX - right;

    if (offsetBottom > 0 && offsetBottom > closestOffsetBottom) {
      closestOffsetBottom = offsetBottom;
      closestBottomTask = task;
    }
    if (offsetTop < 0 && offsetTop < closestOffsetTop) {
      closestOffsetTop = offsetTop;
      closestTopTask = task;
    }
    if (offsetLeft < 0 && offsetLeft < closestOffsetLeft) {
      closestOffsetLeft = offsetLeft;
      closestLeftTask = task;
    }
    if (offsetRight > 0 && offsetRight < closestOffsetRight) {
      closestOffsetRight = offsetRight;
      closestRightTask = task;
    }
  });

  return [closestBottomTask, closestTopTask, closestLeftTask, closestRightTask];
};

