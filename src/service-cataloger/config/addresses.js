const route_swagger_api = 'api';

const actionCommunicatorPort = 3444;
const actionManagerPort = 3555;
const deviceManagerPort = 3333;
const serviceCatalogerPort = 3666;
const dataManagerPort = 3777;
const inputCommunicatorRestPort = 3888;

//protocols ports
const mqttPort = 1883;
const amqpPort = 5672;

const hostnameHttp = 'localhost:';
const hostnameAmqp = 'localhost:';
const hostnameMqtt = 'localhost:';

const req_deviceManagerIpAndPort = 'http://' + hostnameHttp + deviceManagerPort;

const req_serviceCatalogerIpAndPort = 'http://' + hostnameHttp + serviceCatalogerPort;

const req_dataManagerIpAndPort = 'http://' + hostnameHttp + dataManagerPort;

const req_actionManagerIpAndPort = 'http://' + hostnameHttp + actionManagerPort;

const req_actionCommunicatorIpAndPort = 'http://' + hostnameHttp + actionCommunicatorPort;

const amqpBroker = 'amqp://' + hostnameAmqp + amqpPort;

const mqttBroker = 'mqtt://' + hostnameMqtt + mqttPort;

exports.amqpBroker = amqpBroker;
exports.mqttBroker = mqttBroker;

exports.amqpPort = amqpPort;
exports.mqttPort = mqttPort;

exports.hostnameAmqp = hostnameAmqp;
exports.hostnameHttp = hostnameHttp;
exports.hostnameMqtt = hostnameMqtt;

exports.route_swagger_api = route_swagger_api;

exports.inputCommunicatorRestPort = inputCommunicatorRestPort;
exports.dataManagerPort = dataManagerPort;
exports.deviceManagerPort = deviceManagerPort;
exports.serviceCatalogerPort = serviceCatalogerPort;
exports.actionManagerPort = actionManagerPort;
exports.actionCommunicatorPort = actionCommunicatorPort;

exports.req_actionCommunicatorIpAndPort = req_actionCommunicatorIpAndPort;
exports.req_dataManagerIpAndPort = req_dataManagerIpAndPort;
exports.req_deviceManagerIpAndPort = req_deviceManagerIpAndPort;
exports.req_serviceCatalogerIpAndPort = req_serviceCatalogerIpAndPort;
exports.req_actionManagerIpAndPort = req_actionManagerIpAndPort;