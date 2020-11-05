const dotenv    = require('dotenv');
dotenv.config();
module.exports  = {
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_URL_TESTING: process.env.DATABASE_URL_DEV
};