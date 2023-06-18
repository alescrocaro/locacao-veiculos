const express = require('express');

const routes = express.Router();

const VehiclesController = require('../Controllers/VehiclesController');
const UsersController = require('../Controllers/UsersController');
const LoginController = require('../Controllers/LoginController');
const AuthMiddleware = require('../Middlewares/authMiddleware');

// VEHICLE
routes.post('/vehicles', AuthMiddleware, VehiclesController.createVehicle);
routes.get('/vehicles', VehiclesController.index);
routes.put('/vehicles/:id', AuthMiddleware, VehiclesController.updateVehicle)
routes.delete('/vehicles/:id', AuthMiddleware, VehiclesController.deleteVehicle)

routes.get('/vehicles/:id', VehiclesController.getVehicle);


// USER 
routes.post('/users', UsersController.createUser);
routes.get('/users', AuthMiddleware, UsersController.index);
routes.put('/users/:id', AuthMiddleware, UsersController.updateUser)
routes.delete('/users/:id', AuthMiddleware, UsersController.deleteUser)

routes.get('/users/:id', UsersController.getUser);

// LOGIN
routes.post('/login', LoginController.login);



module.exports = routes;