(function() {
  const socket = io.connect();
  const addTodoBtn = document.querySelector('.btn-submit');
  const todoInput = document.querySelector('.todo');
  const todoList = document.querySelector('.todo-list');
  const form = document.querySelector('form');

  function addTodo() {
    const todo = {
      text: todoInput.value,
    };
    todoInput.value = '';
    socket.emit('add todo', todo);
  }

  function deleteTodo(todoId) {
    socket.emit('delete todo', todoId)
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

  // addTodoBtn.addEventListener('click', addTodo);
  form.addEventListener('submit', event => {
    event.preventDefault();
    addTodo();
  });

  socket.on('todo list', todos => {
    renderTodoList(todos);
  });

  socket.on('delete todo', todoId => {
    removeTodo(todoId)
  })

  socket.on('add todo', todo => {
    renderTodo(todo);
  });

  function renderTodo(todo) {
    const el = document.createElement('li');
    const button = document.createElement('button');

    button.innerText = 'X';
    button.className = "btn-delete"
    button.id = `${todo._id}`;
    el.id = `${todo._id}`;
    el.innerText = todo.text;
    el.appendChild(button);
    todoList.appendChild(el);
    button.addEventListener('click', event => {
      deleteTodo(event.target.id)
    })
  }
})();
