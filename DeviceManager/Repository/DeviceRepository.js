const Device = require('../model/Device')

/**
 * Registers a new device into database
 * @param  {Object} device The device object with all the attributes required to register into database
 */
const save = async device => {
    try {
        console.log(device)
        const newDevice = await Device.db.create(device);
        if (newDevice)
            return newDevice;
        else return false;
    } catch (error) {
        return false;
    }
}

/**
 * Updates the data of a device from database
 * @param  {Object} deviceUpdated Object which contains the UUID and updated attribute(s) to update into database
 */
const update = async deviceUpdated => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceUpdated.uuid });
        if (deviceExists) {
            const device = await Device.db.findByIdAndUpdate(deviceExists._id, deviceUpdated, { new: true })
            return device;
        } else
            return false;
    } catch (error) {
        return false;
    }

}

/**
 * Get the data of a device from database
 * @param  {string} deviceUuid UUID of the target device to get
 */
const findByUuid = async deviceUuid => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceUuid });
        if (deviceExists)
            return deviceExists;
        else
            return false;
    } catch (error) {
        return false;
    }

}

/**
 * Returns all the registered devices from the database in an array of objects
 */
const findAll = async () => {
    try {
        const all = await Device.db.find({})
        if (all)
            return all;
        else
            return false;
    } catch (error) {
        return false;
    }
}

/**
 * Deletes a device from the database
 * @param  {string} deviceUuid UUID of the target device to delete
 */
const deleteh = async deviceUuid => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceUuid });
        if (deviceExists) {
            await Device.db.findByIdAndRemove(deviceExists._id);
            return true;
        }
        else
            return false;
    } catch (error) {
        return false;
    }
}

exports.delete = deleteh;
exports.findAll = findAll;
exports.findByUuid = findByUuid;
exports.update = update;
exports.save = save;


