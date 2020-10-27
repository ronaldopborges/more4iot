const express = require('express');
const config = require('./config/routesConfig');
const ActionCommunicatorController = require('./Controller/ActionCommunicatorController');

const routes = express.Router();

routes.post(`/${config.actionCommunicatorRouteNotify}`, ActionCommunicatorController.sendToActuator);

module.exports = routes;