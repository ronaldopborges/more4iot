const route_swagger_api = 'api';

const actionCommunicatorPort = 3444;
const actionManagerPort = 3555;
const deviceManagerPort = 3333;
const serviceCatalogerPort = 3666;
const dataManagerPort = 3777;
const inputCommunicatorRestPort = 3888;

//protocols ports
const mqttPort = 1883;
const amqpPort = 5762;

const hostHttp = 'http://localhost:';
const hostAmqp = 'amqp://localhost:';
const hostMqtt = 'mqtt://localhost:';

const req_deviceManagerIpAndPort = hostHttp + deviceManagerPort;

const req_serviceCatalogerIpAndPort = hostHttp + serviceCatalogerPort;

const req_dataManagerIpAndPort = hostHttp + dataManagerPort;

const req_actionManagerIpAndPort = hostHttp + actionManagerPort;

const req_actionCommunicatorIpAndPort = hostHttp + actionCommunicatorPort;

const amqpBroker = hostAmqp + amqpPort;

const mqttBroker = hostMqtt + mqttPort;

exports.amqpBroker = amqpBroker;
exports.mqttBroker = mqttBroker;

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