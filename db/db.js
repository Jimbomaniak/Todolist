const mongoose = require('mongoose');
const config = require('../config/config');

mongoose.Promise = global.Promise;

const db = () => {
  mongoose.connect(config.uri, config.opts);

  mongoose.set('debug', true);

  mongoose.connection.on('connected', () => {
    this.state = 'connected';
    console.log('Mongoose default connection open to ' + config.uri);
  });

  mongoose.connection.on('error', err => {
    this.state = 'disconnected';
    console.log('Mongoose default connection error: ' + err);
  });

  mongoose.connection.on('disconnected', () => {
    this.state = 'disconnected';
    console.log('Mongoose default connection disconnected');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      this.state = 'disconnected';
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

module.exports = db;
