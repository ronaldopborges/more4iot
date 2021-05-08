const express = require('express');

const ActionController = require('./controller/ActionController');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');

const routes = express.Router();

routes.post(`/${config.actionManagerRouteSave}`,ActionController.inscribeAction);
routes.get(`/${config.actionManagerRouteGetActionsByUuid}/:uuidSensor`,ActionController.getActions);
routes.get(`/${config.actionManagerRouteGetAll}`,ActionController.getAllActions);
routes.get(`/${config.actionManagerRouteNotifyActionCommunicator}`,ActionController.notifyActionCommunicator);

 module.exports = routes;