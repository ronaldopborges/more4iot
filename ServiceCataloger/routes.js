const express = require('express');
const config = require('./config/routesConfig');
const httpProxy = require('express-http-proxy');
const routes = express.Router();
const addresses = require('./config/addresses');

const deviceManagerServiceProxy = httpProxy(addresses.req_deviceManagerIpAndPort);
const dataManagerServiceProxy = httpProxy(addresses.req_dataManagerIpAndPort);
const actionManagerServiceProxy = httpProxy(addresses.req_actionManagerIpAndPort);
const actionCommunicatorServiceProxy = httpProxy(addresses.req_actionCommunicatorIpAndPort);


// GATEWAY TO DEVICE MANAGER
routes.post(`/${config.deviceManagerRouteSave}`, (req, res, next) => deviceManagerServiceProxy(req, res, next));
routes.get(`/${config.deviceManagerRouteCheckDevice}`, (req, res, next) => deviceManagerServiceProxy(req, res, next));
routes.post(`/${config.deviceManagerRouteUpdate}`, (req, res, next) => deviceManagerServiceProxy(req, res, next));
routes.delete(`/${config.deviceManagerRouteDelete}`, (req, res, next) => deviceManagerServiceProxy(req, res, next));
routes.get(`/${config.deviceManagerRouteGetAll}`, (req, res, next) => deviceManagerServiceProxy(req, res, next));

// GATEWAY TO DATA MANAGER
routes.post(`/${config.dataManagerRouteSave}`, (req, res, next) => dataManagerServiceProxy(req, res, next));
routes.get(`/${config.dataManagerRouteGetDataByUuid}`, (req, res, next) => dataManagerServiceProxy(req, res, next));
routes.get(`/${config.dataManagerRouteGetAll}`, (req, res, next) => dataManagerServiceProxy(req, res, next));
routes.get(`/${config.dataManagerRouteGetLastByUuid}`, (req, res, next) => dataManagerServiceProxy(req, res, next));
routes.delete(`/${config.dataManagerRouteDelete}`, (req, res, next) => dataManagerServiceProxy(req, res, next));

// GATEWAY TO ACTION MANAGER
routes.post(`/${config.actionManagerRouteSave}`, (req, res, next) => actionManagerServiceProxy(req, res, next));
routes.get(`/${config.actionManagerRouteGetActionsByUuid}`, (req, res, next) => actionManagerServiceProxy(req, res, next));
routes.get(`/${config.actionManagerRouteGetAll}`, (req, res, next) => actionManagerServiceProxy(req, res, next));
routes.get(`/${config.actionManagerRouteNotifyActionCommunicator}`, (req, res, next) => actionManagerServiceProxy(req, res, next));

// GATEWAY TO ACTION COMMUNICATOR
routes.post(`/${config.actionCommunicatorRouteNotify}`, (req, res, next) => actionCommunicatorServiceProxy(req, res, next));

module.exports = routes;


