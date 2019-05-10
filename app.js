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

  socket.on('delete todo', async todoId => {
    await TodoService.deleteTodo(todoId);
    io.emit('delete todo', todoId);
  });

  socket.emit('todo list', todos);
});

http.listen(PORT, () => console.log(`Listening on *:${PORT}`));
