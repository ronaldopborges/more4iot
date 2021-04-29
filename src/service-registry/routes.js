const express = require('express');
const RegistryController = require('./controller/RegistryController');
const config = require('./config/routesConfig');
const routes = express.Router();

routes.post(`/${config.serviceRegistrySave}`, RegistryController.inscribeRegistry);
routes.get(`/${config.serviceRegistryFind}/:name`, RegistryController.getRegistry);

module.exports = routes;
