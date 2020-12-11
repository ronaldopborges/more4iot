const Data = require('../model/Data');

const save = async dataObj => {
    try {
        const newData = await Data.db.create(dataObj);
        if (newData)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const findLastByUuid = async deviceUuid => {
    try {
        const dataExists = await Data.db.findOne({ deviceUuid: deviceUuid }, {}, { sort: { 'createdAt': -1 } });
        if (dataExists) {
            return dataExists;
        } else
            return false;
    } catch (error) {
        return false;
    }

}

/**
 * Get all registered data objects of a device from database
 * @param  {string} deviceUuid UUID of the target device to get all registered data object
 */
const findByUuid = async dataparam => {
    try {
        const oneExists = await Data.db.findOne({ deviceUuid: dataparam });
        if (oneExists) {
            const dataExists = await Data.db.find({ deviceUuid: dataparam });
            return dataExists;
        }
        else
            return false;
    } catch (error) {
        return false;
    }

}

/**
 * Get all registered data objects from all devices
 */
const findAll = async () => {
    try {
        const all = await Data.db.find({})
        if (all)
            return all;
        else
            return false;
    } catch (error) {
        return false;
    }
}

/**
 * Deletes all registered data objects of a device from the database
 * @param  {string} deviceUuid UUID of the target device to delete
 */
const deleteByUuid = async deviceUuid => {
    try {
        const dataExists = await Data.db.findOne({ deviceUuid: deviceUuid });
        if (dataExists) {
            await Data.db.deleteMany({ deviceUuid: deviceUuid });
            return true;
        }
        else
            return false;
    } catch (error) {
        return false;
    }
}

exports.deleteByUuid = deleteByUuid;
exports.findAll = findAll;
exports.findByUuid = findByUuid;
exports.findLastByUuid = findLastByUuid;
exports.save = save;