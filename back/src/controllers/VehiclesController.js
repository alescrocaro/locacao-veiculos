const connection = require('../service/user');

module.exports = {
  async index(req, res) {
    // const ong_id  = req.headers.authorization;
    const id  = 1;

    const vehicle = await connection.getVehicle(id)

    return res.json(vehicle);
  }
}