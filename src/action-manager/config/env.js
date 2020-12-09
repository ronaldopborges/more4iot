const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SERVICE_PORT: process.env.ACTION_MANAGER_PORT,
  DATABASE_URL: process.env.ACTION_MANAGER_DB_URL,
  DATABASE_URL_TESTING: process.env.ACTION_MANAGER_DB_URL_TEST
};