const addresses = require('../config/addresses');
const httpProxy = require('express-http-proxy');

const deviceManagerServiceProxy = httpProxy(addresses.req_deviceManagerIpAndPort);
const dataManagerServiceProxy = httpProxy(addresses.req_dataManagerIpAndPort);
const actionManagerServiceProxy = httpProxy(addresses.req_actionManagerIpAndPort);
const actionCommunicatorServiceProxy = httpProxy(addresses.req_actionCommunicatorIpAndPort);


// Device Manager controls
const deviceManager = (req, res, next) => deviceManagerServiceProxy(req, res, next)
// Data Manager controls
const dataManager = (req, res, next) => dataManagerServiceProxy(req, res, next)
// Action Manager controls
const actionManager = (req, res, next) => actionManagerServiceProxy(req, res, next)
// Action Communicator controls
const actionCommunicator = (req, res, next) => actionCommunicatorServiceProxy(req, res, next)


exports.deviceManager = deviceManager;
exports.dataManager = dataManager;
exports.actionManager = actionManager;
exports.actionCommunicator = actionCommunicator;