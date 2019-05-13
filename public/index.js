(function() {
  const socket = io.connect();
  const todoInput = document.querySelector('.todo');
  const todoList = document.querySelector('.todo-list');
  const form = document.querySelector('form');


  function validate(fn, todo) {
    const regex = /зрада/i;
    if (todo.text.match(regex)) {
      alert('ЗРАДАААА')
    } else {
      fn(todo)
    }
  }
  function addTodo(todo) {
    socket.emit('add todo', todo);
    todoInput.value = '';
  }

  function deleteTodo(todoId) {
    socket.emit('delete todo', todoId);
  }

  function saveTodo(todo) {
    socket.emit('save todo', todo);
  }

  function renderTodoList(todos) {
    todos.forEach(todo => {
      renderTodo(todo);
    });
  }

  function removeTodo(id) {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
  }

  function editTodo(todo) {
    const todoInput = document.getElementById(todo._id).querySelector('.todo-text');
    todoInput.value = todo.text;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const todo = {
      text: todoInput.value,
    };
    validate(addTodo,todo);
  });

  socket.on('todo list', todos => {
    renderTodoList(todos);
  });

  socket.on('save todo', todo => {
    editTodo(todo);
  });

  socket.on('delete todo', todoId => {
    removeTodo(todoId);
  });

  socket.on('add todo', todo => {
    renderTodo(todo);
  });

  function createButton(className, innerText, id) {
    const button = document.createElement('button');
    button.innerText = innerText;
    button.className = className;
    button.id = id;
    return button;
  }

  function renderTodo(todo) {
    const el = document.createElement('li');
    const input = document.createElement('input');
    const saveButton = createButton('btn-save', 'Save', `${todo._id}`);
    const deleteButton = createButton('btn-delete', 'X', `${todo._id}`);
    el.id = `${todo._id}`;
    input.value = todo.text;
    input.className = 'todo-text';
    el.appendChild(input);
    el.appendChild(deleteButton);
    el.appendChild(saveButton);
    todoList.appendChild(el);
    saveButton.addEventListener('click', event => {
      const todoText = event.target.parentNode.querySelector('.todo-text').value;
      validate(saveTodo, {_id: event.target.id, text: todoText});
    });
    deleteButton.addEventListener('click', event => {
      deleteTodo(event.target.id);
    });
  }
})();
