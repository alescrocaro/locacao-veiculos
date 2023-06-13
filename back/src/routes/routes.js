const express = require('express');

const routes = express.Router();

const VehiclesController = require('../controllers/VehiclesController');
const UsersController = require('../controllers/UsersController');
const LoginController = require('../controllers/LoginController');

// VEHICLE
routes.post('/vehicles', VehiclesController.createVehicle);
routes.get('/vehicles', VehiclesController.index);
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