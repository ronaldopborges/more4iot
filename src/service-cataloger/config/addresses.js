const actionCommunicatorPort                = 3341;

const actionManagerPort                     = 3348;

const deviceManagerPort                     = 3350;

const serviceCatalogerPort                  = 3225;

const dataManagerPort                       = 3349;

const req_deviceManagerIpAndPort            = 'http://localhost:3350/';

const req_serviceCatalogerIpAndPort         = 'http://localhost:3225/';

const req_dataManagerIpAndPort              = 'http://localhost:3349/';

const req_actionManagerIpAndPort            = 'http://localhost:3348/';

const req_actionCommunicatorIpAndPort       = 'http://localhost:3341/';

const inputCommunicatorRestPort             = 3344;

const amqpBroker                            = 'amqp://localhost:5672';
const mqttBroker                            = 'mqtt://broker.hivemq.com';

exports.amqpBroker                          = amqpBroker;
exports.mqttBroker                          = mqttBroker;

exports.inputCommunicatorRestPort           = inputCommunicatorRestPort;

exports.req_actionCommunicatorIpAndPort     = req_actionCommunicatorIpAndPort;
exports.req_dataManagerIpAndPort            = req_dataManagerIpAndPort;
exports.req_deviceManagerIpAndPort          = req_deviceManagerIpAndPort;
exports.req_serviceCatalogerIpAndPort       = req_serviceCatalogerIpAndPort;
exports.req_actionManagerIpAndPort          = req_actionManagerIpAndPort;
exports.dataManagerPort                     = dataManagerPort;
exports.deviceManagerPort                   = deviceManagerPort;
exports.serviceCatalogerPort                = serviceCatalogerPort;
exports.actionManagerPort                   = actionManagerPort;
exports.actionCommunicatorPort              = actionCommunicatorPort;