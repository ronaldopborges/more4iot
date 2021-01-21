const mqtt = require('./mqtt');
const amqp = require('./amqp');
const coap = require('./coap');
const axios = require('axios');
const rest = require('./rest');
const config = require('./config/routesConfig');
const addresses = require('./config/addresses');
const { services, topic, methods } = require('./config/options');

/**
 * Receives a json string from a protocol and handles it to get a 'object' with attributes for 'service', 'method' and object 'data'. Then handles the object to communicate and send the 'data object' and 'method' to the correct 'service'
 * @param  {String} msg A string in json structure with attributes for 'service'(desired service to request), 'method'(desired method to the service to use), object 'data'(data to send to the desired service)
 */
global.sender = async msg => {
    msg = JSON.parse(msg);
    let outputCommunication = false;
    await axios.post(`${addresses.req_dataManagerIpAndPort}/${config.req_dataManagerRouteSave}`, msg).then((res) => {
        outputCommunication = true;
    }).catch((error) => {
        console.log(error.code);
        console.log(error.config);
    })
    return outputCommunication;
}

mqtt(topic);
//amqp(topic);
//coap();
rest();

