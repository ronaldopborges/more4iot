const express = require('express');
const routes = express.Router();

const RegistryController = require('./controller/RegistryController');

routes.post(`/`, RegistryController.inscribeRegistry);
routes.get(`/:name`, RegistryController.getRegistry);

module.exports = routes;
