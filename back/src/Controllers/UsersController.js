const connection = require('../service/user');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function createUser(req, res, next) {
  console.log('creating User...');

  try {
    const salt_rounds = 10;
    const userData = req.body;
    userData.id = uuidv4();
    
    if (
      !userData.document_number || 
      !userData.email|| 
      !userData.full_name || 
      !userData.password || 
      !userData.phone_number
    ) {
      const error = new Error('Bad User Input');
      error.status = 400;
      next(error);
      return;
    }

    console.log('antes oldUser');
    const oldUser = await connection.findUserByFilters(['document_number','email'], userData.document_number);
    console.log(oldUser);
    if (oldUser.data && oldUser.data[0] && oldUser.data[0].deleted_at) {
      const error = new Error('User already exists');
      error.status = 400;
      next(error);
      return;
    }
    


    userData.password = await bcrypt.hash(userData.password, salt_rounds);
    const result = await connection.createUser(userData);

    res.status(201).json(result.data[0]);
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
    const user = await connection.findUserById(id);
    if (!user.data[0]) {
      const error = new Error('User not found');
      error.status = 400;
      next(error);
      return;
    }

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
    const user = result.data[0];

    res.status(200).json(user);
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
