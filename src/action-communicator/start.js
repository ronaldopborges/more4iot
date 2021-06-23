const ip = require('ip');

require('dotenv').config();

const {
    ACTION_COMMUNICATOR_NAME,
} = require('@iotufersa/more4iot-js-sdk/config/services');
const {
    SERVICE_REGISTRY_HOST,
    SERVICE_REGISTRY_PORT,
} = require('./config/registry');

const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);

const { asyncAction } = require('@iotufersa/more4iot-js-sdk/config/routes');
const { ACTION_COMMUNICATOR_PORT } = require('./config/actionCommunicator');
const mqttReceiver = require('./services/mqtt_receiver');

const server = require('./server');

const sv = server.listen(ACTION_COMMUNICATOR_PORT || 0, () => {
    console.log(`Action Communicator online... ${sv.address().port}`);
    rg.sendRegistry(ACTION_COMMUNICATOR_NAME, ip.address(), sv.address().port).then((res) => {
        console.log(`service registry: ${res.data}`)
    })
        .catch((err) => {
            console.log(`service registry: ${err.code}`);
        });
});

mqttReceiver(asyncAction);
