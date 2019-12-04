const express = require('express');
const ActionController = require('./Controller/ActionController');
const config = require('../config/routesConfig');

const routes = express.Router();

routes.post(`/${config.actionManagerRouteSave}`,ActionController.inscribeAction);
routes.get(`/${config.actionManagerRouteGetActionsByUuid}`,ActionController.getActions);
routes.get(`/${config.actionManagerRouteGetAll}`,ActionController.getAllActions);
routes.get(`/${config.actionManagerRouteNotifyActionCommunicator}`,ActionController.notifyActionCommunicator);

 module.exports = routes;