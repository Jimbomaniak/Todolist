const sockets = require('socket.io');
const TodoService = require('../entities/todos/todoService');

const REGEX = /^зрада$/i;

function isValid(text) {
  return !Boolean(text.match(REGEX));
}

const createSocketConnection = http => {
  const io = sockets(http);

  return io.on('connection', async socket => {
    const todos = await TodoService.getAllTodos();

    socket.on('add todo', async todo => {
      if (!isValid(todo.text)) throw Error('Not valid');
      const addedTodo = await TodoService.addTodo(todo);
      io.emit('add todo', addedTodo);
    });

    socket.on('save todo', async todo => {
      if (!isValid(todo.text)) throw Error('Not valid');
      const status = await TodoService.editTodo(todo._id, { text: todo.text });
      if (status.ok) {
        io.emit('save todo', todo);
      } else {
        throw Error('Sorry');
      }
    });

    socket.on('delete todo', async todoId => {
      await TodoService.deleteTodo(todoId);
      io.emit('delete todo', todoId);
    });

    socket.emit('todo list', todos);
  });
};

module.exports = createSocketConnection;
