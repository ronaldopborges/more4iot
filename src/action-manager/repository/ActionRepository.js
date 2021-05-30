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

const findByCreator = async (uuid) => {
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
        return await Action.db.findOneAndUpdate(actionUpdated.creator, actionUpdated, { new: true });
    } catch (error) {
        console.log(error);
    }

    return false;
}

const findWhereActiveByCreator = async (uuid) => {
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

// ------ functions for async data

const findByOriginIdentifierWhereActive = async (identifier) => {
    const search = { origin: identifier , status: true };
    try {
        return await Action.db.find(search);
    }
    catch (error) {
        console.log("Error: findByOriginIdentifierWhereActive");
        console.log(error);
        return false;
    }
}

exports.findWhereActiveByCreator = findWhereActiveByCreator;
exports.findAll = findAll;
exports.findByCreator = findByCreator;
exports.save = save;
exports.update = update;

exports.findByOriginIdentifierWhereActive = findByOriginIdentifierWhereActive;