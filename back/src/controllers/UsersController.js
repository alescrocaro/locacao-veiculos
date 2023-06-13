const connection = require('../service/user');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function createUser(req, res, next) {
  console.log('creating User...');

  try {
    const salt_rounds = 10;
    const data = req.body;

    // try {
    data.password = await bcrypt.hash(data.password, salt_rounds);

    data.id = uuidv4();
    const result = await connection.createUser(data);

    res.status(201).json(result);
    // } catch (err) {
      // const error = new Error(err);
      // error.status = 500;
      // next(error);
    // }
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function index(req, res, next) {
  console.log('reading all Users...');    
  try {
    const result = await connection.getUsers();
    
    res.status(200).json(result);
  } catch (err) {
    const error = new Error(err);
    error.status = 500;
    next(error);
  }
};

async function updateUser(req, res, next) {
  console.log('updating User...');
  try {
    const { id } = req.params;
    const newData = req.body;
    
    const result = await connection.updateUser(id, newData);

    res.status(201).json(result)
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function deleteUser(req, res, next) {
  console.log('deleting User...');

  try {
    const { id } = req.params;
    const User = await connection.deleteUser(id);

    res.status(200).json(User);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

async function getUser(req, res, next) {
  console.log('finding User by id...');
  try {
    const { id } = req.params;
    
    const result = await connection.findUserById(id);

    res.status(200).json(result);
  } catch (err) {
    const error = new Error(err);
    error.status = 400;
    next(error);
  }
}

module.exports = {
  createUser,
  index,
  updateUser,
  deleteUser,
  getUser,
};
