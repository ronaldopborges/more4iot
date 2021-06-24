const dotenv = require('dotenv').config();
const axios = require('axios');

const mqtt = require('./mqtt');
const amqp = require('./amqp');
const coap = require('./coap');
const rest = require('./rest');
const mqtt_sender = require('./services/mqtt_sender');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const { RESOURCE_MANAGER_NAME } = require('@iotufersa/more4iot-js-sdk/config/services');
const debug = require('debug')('input:validation')

/**
 * Receives a json string from a protocol and handles it to get a 'object' with attributes for 'service', 'method' and object 'data'. Then handles the object to communicate and send the 'data object' and 'method' to the correct 'service'
 * @param  {String} msg A string in json structure with attributes for 'service'(desired service to request), 'method'(desired method to the service to use), object 'data'(data to send to the desired service)
 */
global.sender = async (data) => {
    debug(`data received: ${data}`);
    debug('data in process validation...');
    try {
        data = JSON.parse(data);
    } catch (error) {
        console.log(error);
        return;
    }
    debug('resource verify starting...');
    debug('getting resource manager url..');
    let inputValidation = false;
    let resourceUrl;
    try{
        resourceUrl = await rg.getServiceIPAndPort(RESOURCE_MANAGER_NAME);
    }catch(error){
        debug(error.code);
        debug(error.config);
        return;
    }
    if(!resourceUrl){
        debug('resource url undefined...');
        debug('data not sent...');
        return;
    }
    const url = `${resourceUrl}/${config.resourceManagerRouteCheck}/${data.uuid}`;
    debug(`resource verify GET request: ${url}`);
    axios.get(url).then(async (res) => {
        inputValidation = res.data;
        if (inputValidation) {
            debug(`resource verify confirmed...`);
            mqtt_sender(data);
        }else{
            debug(`resource verify failed...`);
        }
    }).catch((error) => {
        debug(error.code);
        debug(error.config);
    })
}

mqtt(config.async_input);
//amqp(topic);
coap(config.inputCommunicatorRoute);
rest();
