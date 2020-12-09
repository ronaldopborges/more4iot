const ActionRepository = require('../repository/ActionRepository');
const Action = require('../model/Action');
const axios = require('../../action-communicator/controller/node_modules/axios');
const config = require('../config/routesConfig');
const addresses = require('../config/addresses');

const inscribeAction = async (req, res) => {
    data        = req.body;
    response    = await ActionRepository.save(data);
    return res.json(response);
}

/**
 * Handless a REST request and send the data to the ActionRepository, for it to get and return all action objects of a specific device from database
 * @param  {Request} req The REST request with the body which contains the UUID of the target device to get all the action objects
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc)  
 */
const getActions = async (req, res) => {
    const response = await ActionRepository.findByUuidSensor(req.params.uuidSensor);
    if (response)
        return res.json(response);
    else
        return res.send(false);
}

/**
 * Handles a REST request and send the data to the ActionRepository, for it to return an array with all registered action objects from all devices from database
 * @param  {Request} req The REST request, no body needed
 * @param  {Response}   res   Response, to return a response to the requester(success/error/array of data, etc)  
 */
const getAllActions = async (req, res) => {
    const response = await ActionRepository.findAll();
    if (response)
        return res.json(response);
    else
        return res.send(false);
}

/**
 * Handles a REST request which contains a sensor's uuid that just received new data and check with the ActionRepository if there are any currently active action object for this sensor, if so, updates the lifetime  of the action and notify the Action Communicator
 * @param  {Request} req The REST request, with the UUID of the sensor which just received new data
 * @param  {Response}   res   Response, to return a response to the requester(success/error/array of data, etc)  
 */
const notifyActionCommunicator = async (req, res) => {
    var flag        = 0;
    const response  = await ActionRepository.findByActiveUuidSensor(req.params.uuidSensor);
    if (response) {
        response.forEach(async action => {
            action      = Action.updateLifetime(action);
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

exports.notifyActionCommunicator    = notifyActionCommunicator;
exports.getAllActions               = getAllActions;
exports.getActions                  = getActions;
exports.inscribeAction              = inscribeAction;