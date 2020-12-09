const express = require('express');
const config = require('./config/routesConfig');
const ActionCommunicatorController = require('./controller/ActionCommunicatorController');

const routes = express.Router();

routes.post(`/${config.actionCommunicatorRouteNotify}`, ActionCommunicatorController.sendToActuator);

module.exports = routes;