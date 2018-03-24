// define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
  // add task event
  form.addEventListener('submit', addTask);
  // remove task event
  taskList.addEventListener('click', removeTask);
  // clear task event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
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
  // clear input
  taskInput.value = '';
}

// remove task
function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      // remove li
      event.target.parentElement.parentElement.remove();
    }
  }
}

// clear all tasks
function clearTasks() {
  // taskList.innerHTML = ''; // not performant
  // faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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