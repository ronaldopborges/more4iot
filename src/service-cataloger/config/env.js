const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  SERVICE_PORT: process.env.SERVICE_CATALOGER_PORT,
  DATABASE_URL: process.env.SERVICE_CATALOGER_DB_URL,
  DATABASE_URL_TESTING: process.env.SERVICE_CATALOGER_DB_URL_TEST
};