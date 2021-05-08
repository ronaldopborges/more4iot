const ip = require('ip');
const dotenv = require('dotenv').config();

const {SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const { ACTION_COMMUNICATOR_NAME } = require('@iotufersa/more4iot-js-sdk/config/services');
const { ACTION_COMMUNICATOR_PORT } = require('./config/actionCommunicator');

const server = require('./server');

const sv = server.listen(ACTION_COMMUNICATOR_PORT || 0, () => {
    console.log(`Action Communicator online... ${sv.address().port}`);
    rg.sendRegistry(ACTION_COMMUNICATOR_NAME, ip.address(), sv.address().port);
});