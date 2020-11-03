const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SERVICE_PORT: process.env.DEVICE_MANAGER_PORT,
  DATABASE_URL: process.env.DEVICE_MANAGER_DB_URL,
  DATABASE_URL_TESTING: process.env.DEVICE_MANAGER_DB_URL_TEST
};