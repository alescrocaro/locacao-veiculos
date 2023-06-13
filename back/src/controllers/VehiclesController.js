const connection = require('../service/vehicle');

module.exports = {
  async index(req, res) {
    // const ong_id  = req.headers.authorization;
    const id = 1;

    const vehicle = await connection.getVehicle(id)

    return res.json(vehicle);
  },

  async create(req, res) {
    const id = 2;

    const vehicle = await connection.createVehicle(id)

    return res.json(vehicle);
  }
}