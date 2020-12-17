const DataRepository = require('../repository/DataRepository');
const axios = require('../node_modules/axios');
const addresses = require('../config/addresses');
const config = require('../config/routesConfig');

const persistData = async (req, res) => {
    const data = req.body;
    let deviceExists = await axios.get(`${addresses.req_deviceManagerIpAndPort}/${config.req_deviceManagerRouteCheckDevice}/${data.deviceUuid}`).then((resp) => {
        return resp.data;
    })

    if (deviceExists) {
        let response = await DataRepository.save(data);
        if (response) {
            axios.get(`${addresses.req_actionManagerIpAndPort}/${config.req_actionManagerRouteNotifyActionCommunicator}/${data.uuid}`).then((res) => {
            }).catch((error) => {
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