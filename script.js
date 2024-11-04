let taskList = [];
let edit_ID = null;

const inputDOM = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add');
const btnText = addBtn.innerText;
const taskListDOM = document.querySelector('.list-container');

window.addEventListener('load', getFromLocalStorage());
addBtn.addEventListener('click', function (e) {
  e.preventDefault();
  addTask();
});
taskListDOM.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete')) {
    deleteTask(e.target.parentNode.parentNode.getAttribute('data-key'));
  }
  if (e.target.classList.contains('edit')) {
    editTask(e.target.parentNode.parentNode.getAttribute('data-key'));
  }
  if (e.target.classList.contains('checkbox')) {
    markAsDone(e.target.parentNode.getAttribute('data-key'));
  }
});

function addTask() {
  const task = inputDOM.value;
  if (!task) return alert('Please enter an task.');
  if (editTask != null) {
    taskList.find((todo) => {
      if (todo.id == edit_ID) {
        todo.task = task;
        task.complete = false;
      }
    });
  }
  if (edit_ID == null) {
    const newTask = {
      task,
      id: Date.now(),
      complete: false,
    };
    taskList.push(newTask);
  }
  inputDOM.value = '';
  saveToLocalStorage(taskList);
  edit_ID = null;
  addBtn.innerText = btnText;
}

function displayTask(tasks) {
  taskListDOM.innerHTML = '';
  tasks.map((task) => {
    const li = document.createElement('li');
    li.classList.add('task');
    li.setAttribute('data-key', task.id);
    li.innerHTML = `
        <input type="checkbox" class="checkbox" />
              ${task.task}
              <div class="btn-container">
              <button class="btn delete">Delete</button>
              <button class="btn edit">Edit</button>
              </div>
          `;
    taskListDOM.appendChild(li);
  });
}

function saveToLocalStorage(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTask(tasks);
}

function getFromLocalStorage() {
  const tasks = localStorage.getItem('tasks');
  if (tasks) {
    taskList = JSON.parse(tasks);
    displayTask(taskList);
  }
}

function deleteTask(id) {
  taskList = taskList.filter((task) => task.id != id);
  saveToLocalStorage(taskList);
}
function editTask(id) {
  edit_ID = id;
  let task = taskList.find((task) => task.id == id);
  inputDOM.focus();
  inputDOM.value = task.task;
  addBtn.textContent = 'Done';
}

// function markAsDone(id) {
//   taskList.find((task) => {
//     let tempTask = task.id == id;
//     if (!tempTask.complete) {
//       tempTask.complete = true;
//       document.querySelector('.task').classList.add('done');
//     } else {
//       task.complete = false;
//       document.querySelector('.task').classList.remove('done');
//     }
//   });
//   saveToLocalStorage(taskList);
// }
