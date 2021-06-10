const express = require('express');
const routes = express.Router();

const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const controller = require('./controller/ServiceCatalogerController')

// GATEWAY TO DEVICE MANAGER
routes.post(`/${config.resourceManagerRouteSave}`, controller.resourceManager);
routes.get(`/${config.resourceManagerRouteCheck}/:uuid`, controller.resourceManager);
routes.put(`/${config.resourceManagerRouteUpdate}`, controller.resourceManager);
routes.delete(`/${config.resourceManagerRouteDelete}/:uuid`, controller.resourceManager);
routes.get(`/${config.resourceManagerRouteFind}/:uuid`, controller.resourceManager);
routes.get(`/${config.resourceManagerRouteGetAll}`, controller.resourceManager);

// GATEWAY TO DATA MANAGER
routes.get(`/${config.dataManagerRouteGetDataByUuid}/:uuid`, controller.dataManager);
routes.get(`/${config.dataManagerRouteGetAll}`, controller.dataManager);
routes.get(`/${config.dataManagerRouteGetLastByUuid}/:uuid`, controller.dataManager);
routes.delete(`/${config.dataManagerRouteDelete}/:uuid`, controller.dataManager);

// GATEWAY TO ACTION MANAGER
routes.post(`/${config.actionManagerRouteSave}`, controller.actionManager);
routes.get(`/${config.actionManagerRouteGetActionsByUuid}/:uuid`, controller.actionManager);
routes.get(`/${config.actionManagerRouteGetAll}`, controller.actionManager);
routes.delete(`/${config.actionManagerRouteDelete}/:id`, controller.actionManager);

module.exports = routes;


