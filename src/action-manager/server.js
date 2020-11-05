const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

const addresses = require('./config/addresses');
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

server.listen(addresses.actionManagerPort, () => {
  console.log("Action manager online...")
});

module.exports = server