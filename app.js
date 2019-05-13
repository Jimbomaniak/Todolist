const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const TodoService = require('./entities/todos/todoService');
const initializeDB = require('./db/db');

const PORT = 3030;

initializeDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index-sock.html');
});

app.get('/public/index.js', (req, res) => {
  res.sendFile(__dirname + '/public/index.js');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/public/style.css');
});

io.on('connection', async socket => {
  const todos = await TodoService.getAllTodos();

  socket.on('add todo', async todo => {
    const addedTodo = await TodoService.addTodo(todo);
    io.emit('add todo', addedTodo);
  });

  socket.on('save todo', async todo => {
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

http.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

http.on('error', onError);

http.listen(PORT, () => console.log(`Listening on *:${PORT}`));

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
