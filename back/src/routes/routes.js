const express = require('express');

const routes = express.Router();

const VehiclesController = require('../controllers/VehiclesController');

routes.post('/vehicles', VehiclesController.createVehicle);
routes.get('/vehicles', VehiclesController.index);
routes.put('/vehicles/:id', VehiclesController.updateVehicle)
routes.delete('/vehicles/:id', VehiclesController.deleteVehicle)


module.exports = routes;