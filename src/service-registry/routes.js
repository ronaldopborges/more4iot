const express = require('express');
const RegistryController = require('./controller/RegistryController');
const config = require('./config/routesConfig');
const routes = express.Router();

routes.post(`/`, RegistryController.inscribeRegistry);
routes.get(`/:name`, RegistryController.getRegistry);

module.exports = routes;
