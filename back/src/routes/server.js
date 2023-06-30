const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' })); // O servidor aceita requests da propria maquina  que vem da porta 3000
server.use(routes);

// 404 - captures any route that does not match with one of routes file ./routes.js
server.use((req, res, next) => {
  const error = new Error('Path not found');
  error.status = 404;
  console.log('error 404')
  next(error);
})

// Catch errors (when next(error) is used, this middleware is called)
server.use((error, req, res, next) => {
  console.log('internal error')
  res.status(error.status || 500)
     .json({error: error.message});
})

module.exports = server;