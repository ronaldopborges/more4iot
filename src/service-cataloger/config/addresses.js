const route_swagger_api                     = '/api';                     

const actionCommunicatorPort                = 3444;

const actionManagerPort                     = 3555;

const deviceManagerPort                     = 3333;

const serviceCatalogerPort                  = 3666;

const dataManagerPort                       = 3777;

const inputCommunicatorRestPort             = 3888;

const req_deviceManagerIpAndPort            = 'http://localhost:'+deviceManagerPort+'/';

const req_serviceCatalogerIpAndPort         = 'http://localhost:'+serviceCatalogerPort+'/';

const req_dataManagerIpAndPort              = 'http://localhost:'+dataManagerPort+'/';

const req_actionManagerIpAndPort            = 'http://localhost:'+actionManagerPort+'/';

const req_actionCommunicatorIpAndPort       = 'http://localhost:'+actionCommunicatorPort+'/';

const amqpBroker                            = 'amqp://localhost:5672';

const mqttBroker                            = 'mqtt://broker.hivemq.com';

exports.amqpBroker = amqpBroker;
exports.mqttBroker = mqttBroker;

exports.route_swagger_api                   = route_swagger_api;

exports.inputCommunicatorRestPort           = inputCommunicatorRestPort;
exports.dataManagerPort                     = dataManagerPort;
exports.deviceManagerPort                   = deviceManagerPort;
exports.serviceCatalogerPort                = serviceCatalogerPort;
exports.actionManagerPort                   = actionManagerPort;
exports.actionCommunicatorPort              = actionCommunicatorPort;

exports.req_actionCommunicatorIpAndPort     = req_actionCommunicatorIpAndPort;
exports.req_dataManagerIpAndPort            = req_dataManagerIpAndPort;
exports.req_deviceManagerIpAndPort          = req_deviceManagerIpAndPort;
exports.req_serviceCatalogerIpAndPort       = req_serviceCatalogerIpAndPort;
exports.req_actionManagerIpAndPort          = req_actionManagerIpAndPort;
