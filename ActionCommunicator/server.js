const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const addresses = require('./config/addresses');
const { DATABASE_URL } = require('./config/env');

const server = express();

server.use(express.json());
server.use(cors())
server.use(routes);


server.listen(addresses.actionCommunicatorPort, () => {
    console.log("Action Communicator online...")
});