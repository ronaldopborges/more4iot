const httpProxy = require('express-http-proxy');

const {DATA_MANAGER_NAME, DEVICE_MANAGER_NAME, ACTION_MANAGER_NAME, ACTION_COMMUNICATOR_NAME} = require('@iotufersa/more4iot-js-sdk//config/services')
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('../config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);

// Device Manager controls
const deviceManager = async (req, res, next) => {
  const deviceManagerUrl = await rg.getServiceIPAndPort(DEVICE_MANAGER_NAME);
  await httpProxy(deviceManagerUrl)(req, res, next);
}
  // Data Manager controls
const dataManager = async (req, res, next) => {
  const dataManagerUrl = await rg.getServiceIPAndPort(DATA_MANAGER_NAME);
  await httpProxy(dataManagerUrl)(req, res, next);
}
  // Action Manager controls
const actionManager = async (req, res, next) => {
  const actionManagerUrl = await rg.getServiceIPAndPort(ACTION_MANAGER_NAME);
  await httpProxy(actionManagerUrl)(req, res, next);
}
// Action Communicator controls
const actionCommunicator = async (req, res, next) => {
  const actionCommunicatorUrl = await rg.getServiceIPAndPort(ACTION_COMMUNICATOR_NAME);
  await httpProxy(actionCommunicatorUrl)(req, res, next);
}

exports.deviceManager = deviceManager;
exports.dataManager = dataManager;
exports.actionManager = actionManager;
exports.actionCommunicator = actionCommunicator;