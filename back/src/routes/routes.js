const express = require('express');

const routes = express.Router();

const VehiclesController = require('../Controllers/VehiclesController');
const UsersController = require('../Controllers/UsersController');
const LoginController = require('../Controllers/LoginController');
const AuthMiddleware = require('../Middlewares/middleware');

// VEHICLE
routes.post('/vehicles', VehiclesController.createVehicle);
routes.get('/vehicles', AuthMiddleware, VehiclesController.index);
routes.put('/vehicles/:id', VehiclesController.updateVehicle)
routes.delete('/vehicles/:id', VehiclesController.deleteVehicle)

routes.get('/vehicles/:id', VehiclesController.getVehicle);


// USER 
routes.post('/users', UsersController.createUser);
routes.get('/users', UsersController.index);
routes.put('/users/:id', UsersController.updateUser)
routes.delete('/users/:id', UsersController.deleteUser)

routes.get('/users/:id', UsersController.getUser);

// LOGIN
routes.post('/login', LoginController.login);



module.exports = routes;