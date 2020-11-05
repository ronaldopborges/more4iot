const DataRepository    = require('../repository/DataRepository');
const axios             = require('../node_modules/axios');
const addresses         = require('../config/addresses');
const config            = require('../config/routesConfig');

/**
 * Handles a REST request and send the data to the DataRepository, for it to persist a new data object into database
 * @param  {Request} req The REST request with the body which contains all the data of the new data object
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc) 
 */
const persistData = async (req, res) => {
    const data = req.body;
    let deviceExists = await axios.get(`${addresses.req_deviceManagerIpAndPort}${config.req_deviceManagerRouteCheckDevice}${data.deviceUuid}`).then((resp) => {
       deviceExists2 = resp.data;
    })

    if (deviceExists2) {
        let response = await DataRepository.save(data);
        if (response) {
            axios.get(`${addresses.req_actionManagerIpAndPort}${config.req_actionManagerRouteNotifyActionCommunicator}${data.deviceUuid}`).then((res) => {
                //console.log(res.data);
            }).catch((error) => {
            })
        } 
        return res.send(response);
    } return res.send(false)
}

/**
 * Handles a REST request and send the data to the DataRepository, for it to get and return all data objects of a device from database
 * @param  {Request} req The REST request with the body which contains the UUID of the target device to get all the data objects
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc)  
 */
const getData = async (req, res) => {
    const response = await DataRepository.findByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else
        return res.send(false);
}

/**
 * Handles a REST request and send the data to the DataRepository, for it to get and return the last registered data object of a device from database
 * @param  {Request} req The REST request with the body which contains the UUID of the target device to get the last registered data object
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc)  
 */
const getLastData = async (req, res) => {
    const response = await DataRepository.findLastByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else
        return res.send(false);
}

/**
 * Handles a REST request and send the data to the DataRepository, for it to return an array with all registered data from all devices from database
 * @param  {Request} req The REST request, no body needed
 * @param  {Response}   res   Response, to return a response to the requester(success/error/array of data, etc)  
 */
const getAllData = async (req, res) => {
    const response = await DataRepository.findAll();
    if (response)
        return res.json(response);
    else
        return res.send(false);
}

/**
 * Handles a REST request and send the data to the DataRepository, for it to delete all registered data objects of a specicfic device from database, by uuid
 * @param  {Request} req The REST request with the body which contains the UUID of the target device to delete all registered data objects
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc)  
 */
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