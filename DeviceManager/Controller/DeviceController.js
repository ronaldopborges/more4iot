const DeviceRepository = require('../repository/DeviceRepository');
const Device = require('../model/Device');

const inscribeDevice = async (req, res) => {
    device = req.body;
    device.uuid = await Device.generateUuid();
    response = await DeviceRepository.save(device);
    return res.send(response);
}
const updateDevice = async (req, res) => {
    device = req.body;
    const response = await DeviceRepository.update(device);
    if (response)
        return res.json(response);
    else return res.send(false);
}
const checkDevice = async (req, res) => {
    const response = await DeviceRepository.findByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else return res.send(false);
}
const getAllDevices = async (req, res) => {
    const response = await DeviceRepository.findAll();
    if (response)
        return res.json(response);
    else return res.send(false);
}
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