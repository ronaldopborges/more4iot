const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const addresses = require('./config/addresses');
const routes = require('./routes');
const { DATABASE_URL } = require('./config/env');

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

mongoose.connect(DATABASE_URL,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  });

server.listen(process.env.DEVICE_MANAGER_PORT, () => {
  console.log("Device manager online...")
});