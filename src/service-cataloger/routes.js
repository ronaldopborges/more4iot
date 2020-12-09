const express = require('express');
const config = require('./config/routesConfig');
const routes = express.Router();
const Controller = require('./controller/ServiceCatalogerController')

// GATEWAY TO DEVICE MANAGER
routes.post(`/${config.deviceManagerRouteSave}`, Controller.deviceManager);
routes.get(`/${config.deviceManagerRouteCheckDevice}`, Controller.deviceManager);
routes.post(`/${config.deviceManagerRouteUpdate}`, Controller.deviceManager);
routes.delete(`/${config.deviceManagerRouteDelete}`, Controller.deviceManager);
routes.get(`/${config.deviceManagerRouteGetAll}`, Controller.deviceManager);

// GATEWAY TO DATA MANAGER
routes.post(`/${config.dataManagerRouteSave}`, Controller.dataManager);
routes.get(`/${config.dataManagerRouteGetDataByUuid}`, Controller.dataManager);
routes.get(`/${config.dataManagerRouteGetAll}`, Controller.dataManager);
routes.get(`/${config.dataManagerRouteGetLastByUuid}`, Controller.dataManager);
routes.delete(`/${config.dataManagerRouteDelete}`, Controller.dataManager);

// GATEWAY TO ACTION MANAGER
routes.post(`/${config.actionManagerRouteSave}`, Controller.actionManager);
routes.get(`/${config.actionManagerRouteGetActionsByUuid}`, Controller.actionManager);
routes.get(`/${config.actionManagerRouteGetAll}`, Controller.actionManager);
routes.get(`/${config.actionManagerRouteNotifyActionCommunicator}`, Controller.actionManager);

// GATEWAY TO ACTION COMMUNICATOR
routes.post(`/${config.actionCommunicatorRouteNotify}`, Controller.actionCommunicator);

module.exports = routes;


