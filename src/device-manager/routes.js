const express = require('express');
const DeviceController = require('./controller/DeviceController');
const config = require('./config/routesConfig');
const routes = express.Router();

routes.post(`/${config.deviceManagerRouteSave}`, DeviceController.inscribeDevice);
routes.get(`/${config.deviceManagerRouteCheckDevice}/:uuid`, DeviceController.checkDevice);
routes.put(`/${config.deviceManagerRouteUpdate}`, DeviceController.updateDevice);
routes.delete(`/${config.deviceManagerRouteDelete}/:uuid`, DeviceController.deleteDevice);
routes.get(`/${config.deviceManagerRouteGetAll}`, DeviceController.getAllDevices);

module.exports = routes;
