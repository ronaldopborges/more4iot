const Action = require('../Model/Action');

const save = async actionparam => {
    try {
        const newAction = await Action.db.create(actionparam);
        if (newAction)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}
const findByUuidSensor = async actionparam => {
    try {
        const oneExists = await Action.db.findOne({ uuidSensor: actionparam });
        if (oneExists) {
            const actionExists = await Action.db.find({ uuidSensor: actionparam });
            return actionExists;
        }
        else
            return false;
    } catch (error) {
        return false;
    }

}
const update = async actionparam => {
    try {
        const updatedAction = await Action.db.findByIdAndUpdate(actionparam._id, actionparam, { new: true });
        if (updatedAction)
            return updatedAction;
        else
            return false;
    } catch (error) {
        return false;
    }

}
const findByActiveUuidSensor = async actionparam => {
    try {
        const oneExists = await Action.db.findOne({ uuidSensor: actionparam, status: true, lifetime: { $gt: 0 } });
        if (oneExists) {
            const actionExists = await Action.db.find({ uuidSensor: actionparam, status: true, lifetime: { $gt: 0 } });
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