const express               = require('express');
const DeviceController      = require('./controller/DeviceController');
const config                = require('./config/routesConfig');
const routes                = express.Router();

routes.post(`/${config.deviceManagerRouteSave}`, DeviceController.inscribeDevice);
routes.get(`/${config.deviceManagerRouteCheckDevice}`, DeviceController.checkDevice);
routes.put(`/${config.deviceManagerRouteUpdate}`, DeviceController.updateDevice);
routes.delete(`/${config.deviceManagerRouteDelete}`, DeviceController.deleteDevice);
routes.get(`/${config.deviceManagerRouteGetAll}`, DeviceController.getAllDevices);

module.exports = routes;
