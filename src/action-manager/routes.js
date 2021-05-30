const express = require('express');

const controller = require('./controller/ActionController');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');

const routes = express.Router();

routes.post(`/${config.actionManagerRouteSave}`, controller.inscribe);
routes.get(`/${config.actionManagerRouteGetActionsByUuid}/:uuid`, controller.getActions);
routes.get(`/${config.actionManagerRouteGetAll}`, controller.getAllActions);
routes.get(`/${config.actionManagerRouteNotifyActionCommunicator}/:uuid`, controller.notify);

 module.exports = routes;