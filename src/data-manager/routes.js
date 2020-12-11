const express = require('express');
const DataController = require('./controller/DataController');
const config = require('./config/routesConfig');

const routes = express.Router();

 routes.post(`/${config.dataManagerRouteSave}`,DataController.persistData);
 routes.get(`/${config.dataManagerRouteGetDataByUuid}/:uuid`,DataController.getData);
 routes.get(`/${config.dataManagerRouteGetAll}`,DataController.getAllData);
 routes.get(`/${config.dataManagerRouteGetLastByUuid}/:uuid`,DataController.getLastData);
 routes.delete(`/${config.dataManagerRouteDelete}/:uuid`,DataController.deleteData);

 module.exports = routes;