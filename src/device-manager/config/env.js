const dotenv    = require('dotenv');
dotenv.config();
module.exports  = {
  DATABASE_URL: process.env.MONGODB_DATABASE_URL,
  DATABASE_URL_TESTING: process.env.MONGODB_DATABASE_URL_TESTING
};