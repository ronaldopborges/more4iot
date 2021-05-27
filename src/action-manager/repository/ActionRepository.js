const Action = require('../model/Action');

const debug = require('debug')('action:repo');

const save = async (action) => {
    try {
        return await Action.db.create(action);
    } catch (error) {
        console.log(error)
        return false;
    }
}

const findByUuidFrom = async (uuidFrom) => {
    try {
        const oneExists = await Action.db.findOne({ uuidFrom: uuidFrom });
        if (oneExists) {
            return await Action.db.find({ uuidFrom: uuidFrom });
        }
    }catch(error){
        return false;
    }
}

const update = async actionUpdated => {
    try {
        return await Action.db.findByIdAndUpdate(actionUpdated._id, actionUpdated, { new: true });
    } catch (error) {
        console.log(error);
        return false;
    }
}

const findByActiveUuidFrom = async (uuidFrom) => {
    try {
        const oneExists = await Action.db.findOne({ uuidFrom: uuidFrom, status: true });
        if (oneExists) {
            const actionExists = await Action.db.find({ uuidFrom: uuidFrom, status: true });
            return actionExists;
        } else return false;
    } catch (error) {
        return false;
    }
}

const findAll = async () => {
    debug('find all actions');
    try {
        return await Action.db.find({});
    } catch (error) {
        console.log(error);
        return {};
    }
}

exports.findByActiveUuidFrom = findByActiveUuidFrom;
exports.findAll = findAll;
exports.findByUuidFrom = findByUuidFrom;
exports.save = save;
exports.update = update;