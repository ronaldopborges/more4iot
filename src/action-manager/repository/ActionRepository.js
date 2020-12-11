const Action = require('../model/Action');

const save = async actionObj => {
    try {
        const newAction = await Action.db.create(actionObj);
        if (newAction)
            return newAction;
        else
            return false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

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

const findByActiveUuidSensor = async deviceUuid => {
    try {
        //console.log(deviceUuid)
        const oneExists = await Action.db.findOne({ uuidSensor: deviceUuid, status: true });
        if (oneExists) {
            const actionExists = await Action.db.find({ uuidSensor: deviceUuid, status: true });
            return actionExists;
        }
        else
            return false;
    } catch (error) {
        return false;
    }

}

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