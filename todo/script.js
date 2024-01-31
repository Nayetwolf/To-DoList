let tasks = [];

document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (task) {
        addTaskToDOM(task);
    });
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = { text: taskText, completed: false };

        // Save the task to localStorage
        saveTask(task);

        // Add the task to the DOM
        addTaskToDOM(task);

        // Clear the input field
        taskInput.value = '';
    }
}

function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
        <button onclick="toggleTask(${tasks.indexOf(task)})">Toggle</button>
        <button onclick="removeTask(${tasks.indexOf(task)})">Remove</button>
    `;

    taskList.appendChild(li);
}

function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}
