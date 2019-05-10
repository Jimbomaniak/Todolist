module.exports = {
  dbname: 'todolist',
  uri: 'mongodb://localhost/todolist',
  opts: {
    server: {
      auto_reconnect: true,
    },
  },
};
