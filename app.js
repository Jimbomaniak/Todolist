const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const initializeDB = require('./db/db');
const createSocketConnection = require('./sockets/service');
const onError = require('./common/ErrorHandle');

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

createSocketConnection(http);

http.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

http.on('error', onError);

http.listen(PORT, () => console.log(`Listening on *:${PORT}`));
