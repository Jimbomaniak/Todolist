require('dotenv').config();
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

module.exports = {
  dbname: 'todolist',
  uri: `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@ds231517.mlab.com:31517/todolist`
};
