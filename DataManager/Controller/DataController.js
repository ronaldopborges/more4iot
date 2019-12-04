const DataRepository = require('../Repository/DataRepository');
const axios = require('axios');
const addresses = require('../../config/addresses');
const config = require('../../config/routesConfig');

const persistData = async (req, res) => {
    data = req.body;
    response = await DataRepository.save(data);
    if (response) {
        axios.get(`${addresses.req_actionManagerIpAndPort}${config.req_actionManagerRouteNotifyActionCommunicator}${data.uuid}`).then((res) => {
        }).catch((error) => {
            console.log(error);
        })
    }return res.send(response);
}
const getData = async (req, res) => {
    const response = await DataRepository.findByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else
        return res.send(false);
}
const getLastData = async (req, res) => {
    const response = await DataRepository.findLastByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else
        return res.send(false);
}
const getAllData = async (req, res) => {
    const response = await DataRepository.findAll();
    if (response)
        return res.json(response);
    else
        return res.send(false);
}
const deleteData = async (req, res) => {
    if (req.params.uuid != undefined) {
        try {
            const response = await DataRepository.deleteByUuid(req.params.uuid);
            return response;
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