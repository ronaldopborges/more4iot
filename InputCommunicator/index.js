const mqtt = require('./mqtt');
const amqp = require('./amqp');
const coap = require('./coap');
const axios = require('axios');
const rest = require('./rest');
const config = require('./config/routesConfig');
const addresses = require('./config/addresses');
const { services, topic, methods } = require('./config/options');

/**
 * Receives a json string from a protocol and handles it to get a 'object' with attributes for 'service', 'method' and object 'data'. Then handles the object to communicate and send the 'data object' and 'method' to the correct 'service'
 * @param  {String} msg A string in json structure with attributes for 'service'(desired service to request), 'method'(desired method to the service to use), object 'data'(data to send to the desired service)
 */
global.sender = msg => {
    msg = JSON.parse(msg);
    const { service, method, data } = msg;
    console.log(`Serviço: ${service}, Método: ${method}`);
    if (service == services.DeviceManager) {
        const device = data;
        switch (method) {
            case (methods.DeviceManager.InscribeDevice):
                axios.post(`${addresses.req_deviceManagerIpAndPort}${config.req_deviceManagerRouteSave}`, device).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DeviceManager.UpdateDevice):
                axios.post(`${addresses.req_deviceManagerIpAndPort}${config.req_deviceManagerRouteUpdate}`, device).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DeviceManager.GetAllDevices):
                axios.get(`${addresses.req_deviceManagerIpAndPort}${config.req_deviceManagerRouteGetAll}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DeviceManager.GetDevice):
                console.log(device.uuid);
                axios.get(`${addresses.req_deviceManagerIpAndPort}${config.req_deviceManagerRouteCheckDevice}${device.uuid}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DeviceManager.DeleteDevice):
                axios.delete(`${addresses.req_deviceManagerIpAndPort}${config.req_deviceManagerRouteDelete}${device.uuid}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            default:
                console.log(`Metodo não existe em ${services.DeviceManager}`);
        }
    }
    if (service == services.DataManager) {
        const data_ = data;
        switch (method) {
            case (methods.DataManager.PersistData):
                axios.post(`${addresses.req_dataManagerIpAndPort}${config.req_dataManagerRouteSave}`, data_).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DataManager.GetData):
                axios.get(`${addresses.req_dataManagerIpAndPort}${config.req_dataManagerRouteGetDataByUuid}${data_.uuid}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DataManager.GetAllData):
                axios.get(`${addresses.req_dataManagerIpAndPort}${config.req_dataManagerRouteGetAll}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DataManager.GetLastData):
                axios.get(`${addresses.req_dataManagerIpAndPort}${config.req_dataManagerRouteGetLastByUuid}${data_.uuid}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.DataManager.DeleteData):
                axios.delete(`${addresses.req_dataManagerIpAndPort}${config.req_dataManagerRouteDelete}${data_.uuid}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            default:
                console.log(`Metodo não existe em ${services.DataManager}`);

        }
    }
    if (service == services.ActionManager) {
        const action = data;
        switch (method) {
            case (methods.ActionManager.InscribeAction):
                axios.post(`${addresses.req_actionManagerIpAndPort}${config.req_actionManagerRouteSave}`, action).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.ActionManager.GetAllActions):
                axios.get(`${addresses.req_actionManagerIpAndPort}${config.req_actionManagerRouteGetAll}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            case (methods.ActionManager.GetActions):
                axios.get(`${addresses.req_actionManagerIpAndPort}${config.req_actionManagerRouteGetActionsByUuid}${action.uuid}`).then((res) => {
                    console.log(res.data);
                }).catch((error) => {
                    console.log(error);
                })
                break;
            default:
                console.log(`Metodo não existe em ${services.ActionManager}`);
        }
    }
}

mqtt(topic);
amqp(topic);
coap();
rest();

