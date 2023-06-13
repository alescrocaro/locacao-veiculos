const express = require('express');

const routes = express.Router();

const VehiclesController = require('../controllers/VehiclesController');

routes.get('/vehicles', VehiclesController.index);
routes.post('/createVehicle', VehiclesController.create);





module.exports = routes;