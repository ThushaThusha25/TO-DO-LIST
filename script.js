let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");
  let text = input.value;

  if (text === "") return;

  tasks.push({ text: text, completed: false });
  input.value = "";

  saveTasks();
  displayTasks();
}

function displayTasks(filter = "all") {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {

    if (filter === "pending" && task.completed === true){return;

    } 
    if (filter === "completed" && task.completed ===false){return;

    } 

    let li = document.createElement("li");

 li.innerHTML = `
            <div class="task-item">
                <input type="checkbox" ${task.completed ? "checked" : ""} 
                    onclick="toggleTask(${index})">
                <span class="${task.completed ? 'completed' : ''}">
                    ${task.text}
                </span>
            </div>
            <button onclick="deleteTask(${index})" class="delete-btn">Delete</button>
        `;
        list.appendChild(li);
    });
}

     

function toggleTask(index) {
  tasks[index].completed =!
  tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function filterTasks(type) {
  displayTasks(type);
}

// Load when page opens
displayTasks();