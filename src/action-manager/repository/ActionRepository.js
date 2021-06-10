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

const findAllByCreator = async (uuid) => {
    try {
        const oneExists = await Action.db.findOne({ creator: uuid });
        if (oneExists) {
            return await Action.db.find({ creator: uuid });
        }
    } catch (error) {
        return false;
    }
}

const update = async (actionUpdated) => {
    try {
        return await Action.db.findByIdAndUpdate(actionUpdated._id, actionUpdated, { new: true });
    } catch (error) {
        console.log(error);
    }

    return false;
}

const findAllWhereActiveByCreator = async (uuid) => {
    try {
        const oneExists = await Action.db.findOne({ creator: uuid, status: true });
        if (oneExists) {
            const actionExists = await Action.db.find({ creator: uuid, status: true });
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

const remove = async (id) => {
    debug(`removing action with id: ${id}`);
    try {
        const action = await Action.db.findByIdAndRemove(id);
        return action ? true : false;
    } catch (error) {
        debug(error);
    }

    return false;
}

// ------ functions for async data

const findByOriginIdentifierWhereActive = async (identifier) => {
    const search = { origin: identifier, status: true };
    try {
        return await Action.db.find(search);
    }
    catch (error) {
        console.log("Error: findByOriginIdentifierWhereActive");
        console.log(error);
        return false;
    }
}

exports.findAllWhereActiveByCreator = findAllWhereActiveByCreator;
exports.findAll = findAll;
exports.findAllByCreator = findAllByCreator;
exports.save = save;
exports.update = update;
exports.delete = remove;

exports.findByOriginIdentifierWhereActive = findByOriginIdentifierWhereActive;