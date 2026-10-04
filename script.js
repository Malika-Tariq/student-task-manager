// Student Task Manager - task logic

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDescription = document.getElementById("taskDescription");
const taskList = document.getElementById("taskList");

let tasks = [];

// Add a new task
taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const title = taskTitle.value.trim();
  if (title === "") {
    return;
  }

  tasks.push({
    id: Date.now(),
    title: title,
    description: taskDescription.value.trim(),
    completed: false
  });

  taskForm.reset();
  renderTasks();
  
});

// Show all tasks on the page
function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    if (task.completed) {
      li.classList.add("completed");
    }

    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const desc = document.createElement("span");
    desc.className = "task-desc";
    desc.textContent = task.description;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.textContent = task.completed ? "Undo" : "Complete";
    completeBtn.addEventListener("click", function () {
      toggleTask(task.id);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteTask(task.id);
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(title);
    li.appendChild(desc);
    li.appendChild(actions);
    taskList.appendChild(li);
    
  });
  applySearch();
}

// Mark a task completed or pending
function toggleTask(id) {
  tasks.forEach(function (task) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  });
  renderTasks();
}

// Delete a task
function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  renderTasks();
}

const searchInput = document.getElementById("searchInput");

function applySearch() {
  const query = searchInput.value.toLowerCase().trim();
  const items = document.querySelectorAll("#taskList li");

  items.forEach(function (item) {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(query) ? "" : "none";
  });
}

searchInput.addEventListener("input", applySearch);