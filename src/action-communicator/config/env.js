const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SERVICE_PORT: process.env.ACTION_COMMUNICATOR_PORT
};