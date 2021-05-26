const express = require('express');
const routes = express.Router();

const DeviceController = require('./controller/DeviceController');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');

routes.post(`/${config.deviceManagerRouteSave}`, DeviceController.inscribeDevice);
routes.get(`/${config.deviceManagerRouteFindDevice}/:uuid`, DeviceController.findDevice);
routes.get(`/${config.deviceManagerRouteCheckDevice}/:uuid`, DeviceController.checkDevice);
routes.put(`/${config.deviceManagerRouteUpdate}`, DeviceController.updateDevice);
routes.delete(`/${config.deviceManagerRouteDelete}/:uuid`, DeviceController.deleteDevice);
routes.get(`/${config.deviceManagerRouteGetAll}`, DeviceController.getAllDevices);

module.exports = routes;
