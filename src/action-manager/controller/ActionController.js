const axios = require('axios');

const ActionRepository = require('../repository/ActionRepository');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const {ACTION_COMMUNICATOR_NAME} = require('@iotufersa/more4iot-js-sdk/config/services');
const Action = require('../model/Action');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('../config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);

const inscribeAction = async (req, res) => {
    data = req.body;
    response = await ActionRepository.save(data);
    return res.json(response);
}

const getActions = async (req, res) => {
    const response = await ActionRepository.findByUuidSensor(req.params.uuidSensor);
    if (response)
        return res.json(response);
    else
        return res.send(false);
}

const getAllActions = async (req, res) => {
    const response = await ActionRepository.findAll();
    if (response)
        return res.json(response);
    else
        return res.send(false);
}

const notifyActionCommunicator = async (req, res) => {
    var flag = 0;
    const response = await ActionRepository.findByActiveUuidSensor(req.params.uuidSensor);
    if (response) {
        response.forEach(async action => {
            action = Action.updateLifetime(action);
            var updated = await ActionRepository.update(action);
            if (!updated)
                flag = flag + 1;
        })
        if (flag == 0){
            const communicatorUrl = await rg.getServiceIPAndPort(ACTION_COMMUNICATOR_NAME);
            axios.post(`${communicatorUrl}/${config.req_actionCommunicatorRouteNotify}`, response).then((res) => {
            }).catch((error) => {
                console.log(error);
            })
        }
        return res.send(true);
    } else
        return res.send(false);
}

exports.notifyActionCommunicator = notifyActionCommunicator;
exports.getAllActions = getAllActions;
exports.getActions = getActions;
exports.inscribeAction = inscribeAction;