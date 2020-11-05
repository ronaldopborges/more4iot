
const actionCommunicatorRouteNotify                         = 'actioncommunicator/notify';

const actionManagerRouteSave                                = 'actions/inscribe';
const actionManagerRouteGetActionsByUuid                    = 'actions/:uuidSensor';
const actionManagerRouteGetAll                              = 'actions';
const actionManagerRouteNotifyActionCommunicator            = 'actions/notify/:uuidSensor';

const deviceManagerRouteSave                                = 'devices/inscribe';
const deviceManagerRouteUpdate                              = 'devices/update';
const deviceManagerRouteGetAll                              = 'devices';
const deviceManagerRouteCheckDevice                         = 'devices/:uuid';
const deviceManagerRouteDelete                              = 'devices/delete/:uuid';

const dataManagerRouteSave                                  = 'datas/persist';
const dataManagerRouteGetDataByUuid                         = 'datas/:uuid';
const dataManagerRouteGetAll                                = 'datas';
const dataManagerRouteGetLastByUuid                         = 'datas/last/:uuid';
const dataManagerRouteDelete                                = 'datas/delete/:uuid';

const req_deviceManagerRouteSave                            = 'devices/inscribe';
const req_deviceManagerRouteUpdate                          = 'devices/update';
const req_deviceManagerRouteGetAll                          = 'devices';
const req_deviceManagerRouteCheckDevice                     = 'devices/';
const req_deviceManagerRouteDelete                          = 'devices/delete/';

const req_dataManagerRouteSave                              = 'datas/persist';
const req_dataManagerRouteGetDataByUuid                     = 'datas/';
const req_dataManagerRouteGetAll                            = 'datas';
const req_dataManagerRouteGetLastByUuid                     = 'datas/last/';
const req_dataManagerRouteDelete                            = 'datas/delete/';

const req_actionManagerRouteSave                            = 'actions/inscribe';
const req_actionManagerRouteGetActionsByUuid                = 'actions/';
const req_actionManagerRouteGetAll                          = 'actions';
const req_actionManagerRouteNotifyActionCommunicator        = 'actions/notify/';

const req_actionCommunicatorRouteNotify                     = 'actioncommunicator/notify';

const inputCommunicatorRoute                                = 'inputcommunicator';

exports.actionCommunicatorRouteNotify                       = actionCommunicatorRouteNotify;

exports.actionManagerRouteSave                              = actionManagerRouteSave;
exports.actionManagerRouteGetActionsByUuid                  = actionManagerRouteGetActionsByUuid;
exports.actionManagerRouteGetAll                            = actionManagerRouteGetAll;
exports.actionManagerRouteNotifyActionCommunicator          = actionManagerRouteNotifyActionCommunicator;

exports.deviceManagerRouteSave                              = deviceManagerRouteSave;
exports.deviceManagerRouteUpdate                            = deviceManagerRouteUpdate;
exports.deviceManagerRouteDelete                            = deviceManagerRouteDelete;
exports.deviceManagerRouteGetAll                            = deviceManagerRouteGetAll;
exports.deviceManagerRouteCheckDevice                       = deviceManagerRouteCheckDevice;

exports.dataManagerRouteSave                                = dataManagerRouteSave;
exports.dataManagerRouteGetDataByUuid                       = dataManagerRouteGetDataByUuid;
exports.dataManagerRouteGetAll                              = dataManagerRouteGetAll;
exports.dataManagerRouteGetLastByUuid                       = dataManagerRouteGetLastByUuid;
exports.dataManagerRouteDelete                              = dataManagerRouteDelete;

exports.req_actionManagerRouteSave                          = req_actionManagerRouteSave;
exports.req_actionManagerRouteGetActionsByUuid              = req_actionManagerRouteGetActionsByUuid;
exports.req_actionManagerRouteGetAll                        = req_actionManagerRouteGetAll;
exports.req_actionManagerRouteNotifyActionCommunicator      = req_actionManagerRouteNotifyActionCommunicator;


exports.req_deviceManagerRouteSave                          = req_deviceManagerRouteSave;
exports.req_deviceManagerRouteUpdate                        = req_deviceManagerRouteUpdate;
exports.req_deviceManagerRouteDelete                        = req_deviceManagerRouteDelete;
exports.req_deviceManagerRouteGetAll                        = req_deviceManagerRouteGetAll;
exports.req_deviceManagerRouteCheckDevice                   = req_deviceManagerRouteCheckDevice;

exports.req_dataManagerRouteSave                            = req_dataManagerRouteSave;
exports.req_dataManagerRouteGetDataByUuid                   = req_dataManagerRouteGetDataByUuid;
exports.req_dataManagerRouteDelete                          = req_dataManagerRouteDelete;
exports.req_dataManagerRouteGetAll                          = req_dataManagerRouteGetAll;
exports.req_dataManagerRouteGetLastByUuid                   = req_dataManagerRouteGetLastByUuid;

exports.req_actionCommunicatorRouteNotify                   = req_actionCommunicatorRouteNotify;

exports.inputCommunicatorRoute                              = inputCommunicatorRoute;


