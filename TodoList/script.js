document.addEventListener('DOMContentLoaded', () => {
  loadTodos();
  loadSubmissions();
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();
  document.querySelectorAll('.error').forEach(error => error.classList.remove('show'));
  let hasError = false;

  const name = document.getElementById('name').value.trim();
  if (!name) {
    document.getElementById('name-error').classList.add('show');
    hasError = true;
  }

  const email = document.getElementById('email').value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById('email-error').classList.add('show');
    hasError = true;
  }

  const message = document.getElementById('message').value.trim();
  if (!message) {
    document.getElementById('message-error').classList.add('show');
    hasError = true;
  }

  if (!hasError) {
    const submission = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toLocaleString()
    };
    saveSubmission(submission);
    appendSubmissionToDOM(submission);
    alert('Form submitted successfully!');
    this.reset();
  }
});

function saveSubmission(submission) {
  let submissions = getSubmissions();
  submissions.push(submission);
  localStorage.setItem('submissions', JSON.stringify(submissions));
}

function getSubmissions() {
  return JSON.parse(localStorage.getItem('submissions') || '[]');
}

function loadSubmissions() {
  const submissions = getSubmissions();
  submissions.forEach(submission => appendSubmissionToDOM(submission));
}

function appendSubmissionToDOM(submission) {
  const submissionList = document.getElementById('submissions');
  const li = document.createElement('li');
  li.dataset.id = submission.id;
  li.innerHTML = `<strong>${submission.name}</strong> (${submission.email}) - ${submission.message} <em>(${submission.timestamp})</em>`;
  submissionList.appendChild(li);
}

function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const taskText = todoInput.value.trim();

  if (taskText) {
    const todo = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    appendTodoToDOM(todo);
    saveTodo(todo);
    todoInput.value = '';
  }
}

function appendTodoToDOM(todo) {
  const todoList = document.getElementById('todo-items');
  const li = document.createElement('li');
  li.dataset.id = todo.id;
  if (todo.completed) {
    li.classList.add('completed');
  }

  const taskSpan = document.createElement('span');
  taskSpan.textContent = todo.text;
  taskSpan.addEventListener('click', () => toggleTodo(todo.id));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

  li.appendChild(taskSpan);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

function saveTodo(todo) {
  let todos = getTodos();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}

function loadTodos() {
  const todos = getTodos();
  todos.forEach(todo => appendTodoToDOM(todo));
}

function toggleTodo(id) {
  let todos = getTodos();
  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(todos));

  const li = document.querySelector(`li[data-id="${id}"]`);
  if (li) {
    li.classList.toggle('completed');
  }
}

function deleteTodo(id) {
  let todos = getTodos();
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));

  const li = document.querySelector(`li[data-id="${id}"]`);
  if (li) {
    li.remove();
  }
}

function clearAllTodos() {
  localStorage.removeItem('todos');
  document.getElementById('todo-items').innerHTML = '';
}