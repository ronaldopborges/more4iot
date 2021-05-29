const express = require('express');
const routes = express.Router();

const controller = require('./controller/ResourceController');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');

routes.post(`/${config.resourceManagerRouteSave}`, controller.inscribe);
routes.get(`/${config.resourceManagerRouteFind}/:uuid`, controller.find);
routes.get(`/${config.resourceManagerRouteCheck}/:uuid`, controller.check);
routes.put(`/${config.resourceManagerRouteUpdate}`, controller.update);
routes.delete(`/${config.resourceManagerRouteDelete}/:uuid`, controller.delete);
routes.get(`/${config.resourceManagerRouteGetAll}`, controller.getAll);

module.exports = routes;
