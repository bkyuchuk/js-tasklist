// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
  });
}

// add task
function addTask(event) {
  event.preventDefault();
  // make sure value is present
  if (taskInput.value === '') {
    alert('add a task');
  }
  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';
  // create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new link element
  const link = document.createElement('a');
  // add class
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to the li
  li.appendChild(link);
  // append li to ul
  taskList.appendChild(li);
  // store in LS
  storeTaskInLocalStorage(taskInput.value);
  // clear input
  taskInput.value = '';
}

// store task
function storeTaskInLocalStorage(task) {
  let tasks;
  // check LS to see if tasks in there
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // add new task
  tasks.push(task);
  // set back to LS
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // remove li
      event.target.parentElement.parentElement.remove();
      // remove from LS
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear all tasks
function clearTasks() {
  // taskList.innerHTML = ''; // not performant
  // faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from LS
  clearTasksFromLocalStorage();
}

// clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(event) {
  const text = event.target.value.toLowerCase();
  // take all li elements
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    // check if typing in input matches text of li
    if (item.toLowerCase().indexOf(text) !== -1) {
      // there is a match
      task.style.display = 'block';
    } else {
      // there is no match
      task.style.display = 'none';
    }
  });
}