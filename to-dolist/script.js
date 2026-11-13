const tdl = document.getElementById("tdl");
const add = document.getElementById("add");
const tasks = document.getElementById("tasks");
const search = document.getElementById("search");
const clear = document.getElementById("clear");
const total = document.getElementById("total");
const completed = document.getElementById("completed");

let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let editIndex = -1;

function saveTasks() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function displayTasks() {

    tasks.innerHTML = "";

    let completedCount = 0;

    const keyword = search.value.toLowerCase();

    const filteredTasks = todoList.filter(task =>
        task.name.toLowerCase().includes(keyword)
    );

    filteredTasks.forEach(task => {

        const originalIndex = todoList.indexOf(task);

        const card = document.createElement("div");
        card.className = "task";

        if (task.completed) {
            card.classList.add("completed");
            completedCount++;
        }

        const span = document.createElement("span");
        span.textContent = task.name;

        span.addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            displayTasks();
        });

        const actions = document.createElement("div");
        actions.className = "actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        editBtn.addEventListener("click", () => {
            tdl.value = task.name;
            editIndex = originalIndex;
            add.textContent = "Update";
            tdl.focus();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {

            if (confirm("Delete this task?")) {

                todoList.splice(originalIndex, 1);

                saveTasks();

                displayTasks();

            }

        });

        actions.append(editBtn, deleteBtn);

        card.append(span, actions);

        tasks.append(card);

    });

    total.textContent = todoList.length;
    completed.textContent = todoList.filter(t => t.completed).length;

    if (filteredTasks.length === 0) {

        tasks.innerHTML =
        "<h3 style='text-align:center;color:white;'>No Tasks Found</h3>";

    }

}

function addTask() {

    const taskName = tdl.value.trim();

    if (taskName === "") {

        alert("Please enter a task.");

        return;

    }

    if (editIndex === -1) {

        todoList.push({
            name: taskName,
            completed: false
        });

    } else {

        todoList[editIndex].name = taskName;

        editIndex = -1;

        add.textContent = "Add";

    }

    tdl.value = "";

    saveTasks();

    displayTasks();

}

add.addEventListener("click", addTask);

tdl.addEventListener("keydown", e => {

    if (e.key === "Enter") {

        addTask();

    }

});

search.addEventListener("input", displayTasks);

clear.addEventListener("click", () => {

    if (todoList.length === 0) return;

    if (confirm("Clear all tasks?")) {

        todoList = [];

        saveTasks();

        displayTasks();

    }

});

displayTasks();