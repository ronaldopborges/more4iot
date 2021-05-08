const express = require('express');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const ActionCommunicatorController = require('./controller/ActionCommunicatorController');

const routes = express.Router();

routes.post(`/${config.actionCommunicatorRouteNotify}`, ActionCommunicatorController.sendToActuator);

module.exports = routes;