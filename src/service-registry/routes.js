const express = require('express');
const routes = express.Router();

const { serviceRegistryRouteInscribe, serviceRegistryRouteGet } = require('@iotufersa/more4iot-js-sdk/config/routes');
const controller = require('./controller/RegistryController');

routes.post(`/${serviceRegistryRouteInscribe}`, controller.inscribeRegistry);
routes.get(`/${serviceRegistryRouteGet}/:name`, controller.getRegistry);

module.exports = routes;
