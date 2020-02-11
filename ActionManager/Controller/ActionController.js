const ActionRepository = require('../repository/ActionRepository');
const Action = require('../model/Action');
const axios = require('./node_modules/axiose_modules/axios');
const config = require('../../config/routesConfig');
const addresses = require('../../config/addresses');

const inscribeAction = async (req, res) => {
    data = req.body;
    response = await ActionRepository.save(data);
    return res.send(response);
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
            if(!updated)
            flag = flag + 1;
        })
        if(flag == 0)
        axios.post(`${addresses.req_actionCommunicatorIpAndPort}${config.req_actionCommunicatorRouteNotify}`, response).then((res) => {
        }).catch((error) => {
            console.log(error);
        })
        return res.send(true);
    } else
        return res.send(false);
}

exports.notifyActionCommunicator = notifyActionCommunicator;
exports.getAllActions = getAllActions;
exports.getActions = getActions;
exports.inscribeAction = inscribeAction;