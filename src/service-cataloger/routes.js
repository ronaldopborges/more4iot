const express = require('express');
const routes = express.Router();

const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const controller = require('./controller/ServiceCatalogerController')

// GATEWAY TO DEVICE MANAGER
routes.post(`/${config.deviceManagerRouteSave}`, controller.deviceManager);
routes.get(`/${config.deviceManagerRouteCheckDevice}`, controller.deviceManager);
routes.post(`/${config.deviceManagerRouteUpdate}`, controller.deviceManager);
routes.delete(`/${config.deviceManagerRouteDelete}`, controller.deviceManager);
routes.get(`/${config.deviceManagerRouteGetAll}`, controller.deviceManager);

// GATEWAY TO DATA MANAGER
routes.post(`/${config.dataManagerRouteSave}`, controller.dataManager);
routes.get(`/${config.dataManagerRouteGetDataByUuid}`, controller.dataManager);
routes.get(`/${config.dataManagerRouteGetAll}`, controller.dataManager);
routes.get(`/${config.dataManagerRouteGetLastByUuid}`, controller.dataManager);
routes.delete(`/${config.dataManagerRouteDelete}`, controller.dataManager);

// GATEWAY TO ACTION MANAGER
routes.post(`/${config.actionManagerRouteSave}`, controller.actionManager);
routes.get(`/${config.actionManagerRouteGetActionsByUuid}`, controller.actionManager);
routes.get(`/${config.actionManagerRouteGetAll}`, controller.actionManager);
routes.get(`/${config.actionManagerRouteNotifyActionCommunicator}`, controller.actionManager);

// GATEWAY TO ACTION COMMUNICATOR
routes.post(`/${config.actionCommunicatorRouteNotify}`, controller.actionCommunicator);

module.exports = routes;


