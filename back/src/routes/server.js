const express = require('express');
const routes = require('./routes');

const server = express();
server.use(express.json());
server.use(routes);

// 404
server.use((req, res, next) => {
  const error = new Error('Path not found');
  error.status = 404;
  console.log('error 404')
  next(error);
})

// Catch errors
server.use((error, req, res, next) => {
  console.log('internal error')
  res.status(error.status || 500)
     .json({error: error.message});
})

module.exports = server;