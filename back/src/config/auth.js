require('dotenv').config();

module.exports = {
  secret: process.env.JWT_KEY,
  expireIn: process.env.JWT_EXPIRES_IN,
};