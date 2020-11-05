const express           = require('express');
const DataController    = require('./controller/DataController');
const config            = require('./config/routesConfig');
const routes            = express.Router();

 routes.post(`/${config.dataManagerRouteSave}`,DataController.persistData);
 routes.get(`/${config.dataManagerRouteGetDataByUuid}`,DataController.getData);
 routes.get(`/${config.dataManagerRouteGetAll}`,DataController.getAllData);
 routes.get(`/${config.dataManagerRouteGetLastByUuid}`,DataController.getLastData);
 routes.delete(`/${config.dataManagerRouteDelete}`,DataController.deleteData);

 module.exports         = routes;