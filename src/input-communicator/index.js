const dotenv = require('dotenv').config();
const axios = require('axios');

const mqtt = require('./mqtt');
const amqp = require('./amqp');
const coap = require('./coap');
const rest = require('./rest');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const {SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const {DATA_MANAGER_NAME} = require('@iotufersa/more4iot-js-sdk/config/services');

/**
 * Receives a json string from a protocol and handles it to get a 'object' with attributes for 'service', 'method' and object 'data'. Then handles the object to communicate and send the 'data object' and 'method' to the correct 'service'
 * @param  {String} msg A string in json structure with attributes for 'service'(desired service to request), 'method'(desired method to the service to use), object 'data'(data to send to the desired service)
 */
global.sender = async msg => {
    msg = JSON.parse(msg);
    let outputCommunication = false;
    const dataManagerUrl = await rg.getServiceIPAndPort(DATA_MANAGER_NAME);
    await axios.post(`${dataManagerUrl}/${config.req_dataManagerRouteSave}`, msg).then((res) => {
        outputCommunication = true;
    }).catch((error) => {
        console.log(error.code);
        console.log(error.config);
    })
    return outputCommunication;
}

mqtt(config.topic);
//amqp(topic);
//coap();
rest();
