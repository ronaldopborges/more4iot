const Action = require('../model/Action');

/**
 * Registers a new action object into database
 * @param  {Object} actionObj The action object with all the attributes required to register into database
 */
const save = async actionObj => {
    try {
        const newAction = await Action.db.create(actionObj);
        if (newAction)
            return newAction;
        else
            return false;
    } catch (error) {
        return false;
    }
}

/**
 * Get all registered action objects of a sensor from database, by uuid
 * @param  {string} deviceUuid UUID of the target sensor to get the all registered action objects
 */
const findByUuidSensor = async deviceUuid => {
    try {
        const oneExists = await Action.db.findOne({ uuidSensor: deviceUuid });
        if (oneExists) {
            const actionExists = await Action.db.find({ uuidSensor: deviceUuid });
            return actionExists;
        }
        else
            return false;
    } catch (error) {
        return false;
    }

}

/**
 * Updates the data of an action object from database
 * @param  {Object} actionUpdated Action object which contains the _id and updated attribute(s) to update into database
 */
const update = async actionUpdated => {
    try {
        const updatedAction = await Action.db.findByIdAndUpdate(actionUpdated._id, actionUpdated, { new: true });
        if (updatedAction)
            return updatedAction;
        else
            return false;
    } catch (error) {
        return false;
    }

}

/**
 * Get all currently active actions(checks its status)
 * @param  {string} deviceUuid UUID of the target device sensor to get all currently active actions
 */
const findByActiveUuidSensor = async deviceUuid => {
    try {
        const oneExists = await Action.db.findOne({ uuidSensor: deviceUuid, status: true, lifetime: { $gt: 0 } });
        if (oneExists) {
            const actionExists = await Action.db.find({ uuidSensor: deviceUuid, status: true, lifetime: { $gt: 0 } });
            return actionExists;
        }
        else
            return false;
    } catch (error) {
        return false;
    }

}


/**
 * Get all registered action objects from all devices
 */
const findAll = async () => {
    try {
        const all = await Action.db.find({})
        if (all)
            return all;
        else
            return false;
    } catch (error) {
        return false;
    }
}

exports.findByActiveUuidSensor = findByActiveUuidSensor;
exports.findAll = findAll;
exports.findByUuidSensor = findByUuidSensor;
exports.save = save;
exports.update = update;