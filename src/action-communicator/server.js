const ip = require('ip');
const dotenv = require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const addresses = require('./config/addresses');

const rg = require('./services/RegistryService');
const { ACTION_COMMUNICATOR_NAME, ROUTE_SWAGGER_API } = require('./config/more4iot')

const server = express();

server.use(express.json());
server.use(cors())
server.use(routes);

server.listen(addresses.actionCommunicatorPort, () => {
    console.log(`Action Communicator online... ${sv.address().port}`);
    rg.sendRegistry(ACTION_COMMUNICATOR_NAME, ip.address(), sv.address().port);
});