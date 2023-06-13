const connection = require('../service/vehicle');
const { v4: uuidv4 } = require('uuid');

async function createVehicle(req, res) {
  console.log('creating vehicle...');

  try {
    const data = req.body;
    console.log(req.body);
    data.id = uuidv4();
    const result = await connection.createVehicle(data);

    res.status(201).json(result);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function index(req, res, next) {
  console.log('reading all vehicles...');    
  try {
    const result = await connection.getVehicles();
    
    res.status(200).json(result);
  } catch (err) {
    const error = new Error(err);
    error.status = 500;
    next(error);
  }
};

async function updateVehicle(req, res, next) {
  console.log('updating vehicle...');
  try {
    const { id } = req.params;
    const newData = req.body;
    
    const result = await connection.updateVehicle(id, newData);

    res.status(201).json(result)
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function deleteVehicle(req, res, next) {
  console.log('deleting vehicle...');

  try {
    const { id } = req.params;
    const vehicle = await connection.deleteVehicle(id);

    res.status(200).json(vehicle);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

module.exports = {
  createVehicle,
  index,
  updateVehicle,
  deleteVehicle,
};
