const DeviceRepository = require('../repository/DeviceRepository');
const Device = require('../model/Device');

/**
 * Handles a REST request and send the data to the DeviceRepository, for it to register a new device into database
 * @param  {Request} req The REST request with the body which contains all the data of the new device
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc) 
 */
const inscribeDevice = async (req, res) => {
    device = req.body;
    device.uuid = await Device.generateUuid();
    response = await DeviceRepository.save(device);
    return res.json(response);
}

/**
 * Handles a REST request and send the data to the DeviceRepository, for it to update the data of a device from database
 * @param  {Request} req The REST request with the body which contains the new data to update and the uuid of the target device
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc) 
 */
const updateDevice = async (req, res) => {
    device = req.body;
    const response = await DeviceRepository.update(device);
    if (response)
        return res.json(response);
    else return res.send(false);
}

/**
 * Handles a REST request and send the data to the DeviceRepository, for it to get and return the info of a device from database
 * @param  {Request} req The REST request with the body which contains the UUID of the target device
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc)  
 */
const checkDevice = async (req, res) => {
    const response = await DeviceRepository.findByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else return res.send(false);
}

/**
 * Handles a REST request and send the data to the DeviceRepository, for it to return an array with all the devices registered in the database
 * @param  {Request} req The REST request, no body needed
 * @param  {Response}   res   Response, to return a response to the requester(success/error/array of data, etc)  
 */
const getAllDevices = async (req, res) => {
    const response = await DeviceRepository.findAll();
    if (response)
        return res.json(response);
    else return res.send(false);
}

/**
 * Handles a REST request and send the data to the DeviceRepository, for it to delete a device from database
 * @param  {Request} req The REST request with the body which contains the UUID of the target device to delete
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc)  
 */
const deleteDevice = async (req, res) => {
    if (req.params.uuid != undefined) {
        try {
            const response = await DeviceRepository.delete(req.params.uuid);
            return res.send(response);
        } catch (error) {
            return res.json({ error: error.message })
        }
    } else
        return res.send(false);
}

exports.deleteDevice = deleteDevice;
exports.getAllDevices = getAllDevices;
exports.checkDevice = checkDevice;
exports.updateDevice = updateDevice;
exports.inscribeDevice = inscribeDevice;
