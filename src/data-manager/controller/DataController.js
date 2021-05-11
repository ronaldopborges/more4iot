const DataRepository = require('../repository/DataRepository');
const axios = require('axios');

const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('../config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const {DEVICE_MANAGER_NAME, ACTION_MANAGER_NAME} = require('@iotufersa/more4iot-js-sdk/config/services');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');

const persistData = async (req, res) => {
    const data = req.body;
    const deviceUrl = await rg.getServiceIPAndPort(DEVICE_MANAGER_NAME);
    let deviceExists = await axios.get(`${deviceUrl}/${config.req_deviceManagerRouteCheckDevice}/${data.deviceUuid}`).then((resp) => {
        return resp.data;
    })

    if (deviceExists) {
        const actionUrl = await rg.getServiceIPAndPort(ACTION_MANAGER_NAME);
        let response = await DataRepository.save(data);
        if (response) {
            axios.get(`${actionUrl}/${config.req_actionManagerRouteNotifyActionCommunicator}/${data.uuid}`).then((res) => {
            }).catch((error) => {
                console.log(error);
            })
        }
        return res.send(response);
    } return res.send(false)
}

const getData = async (req, res) => {
    const response = await DataRepository.findByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else
        return res.send({});
}

const getLastData = async (req, res) => {
    const response = await DataRepository.findLastByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else
        return res.send({});
}

const getAllData = async (req, res) => {
    const response = await DataRepository.findAll();
    if (response)
        return res.json(response);
    else
        return res.send({});
}

const deleteData = async (req, res) => {
    if (req.params.uuid != undefined) {
        try {
            const response = await DataRepository.deleteByUuid(req.params.uuid);
            return res.send(response);
        } catch (error) {
            return res.json({ error: error.message })
        }
    } else
        return res.send(false);
}

exports.deleteData = deleteData;
exports.getAllData = getAllData;
exports.getLastData = getLastData;
exports.getData = getData;
exports.persistData = persistData;