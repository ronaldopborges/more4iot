const repo = require('../repository/ActionRepository');
const debug = require('debug')('action:controller');
const Action = require('../model/Action');

const inscribe = async (req, res) => {
    debug('inscribe action...');
    const action = await repo.save(req.body);
    return res.send(action);
}

const getActions = async (req, res) => {
    debug('find actions from uuid...');
    return res.send(await repo.findByCreator(req.params.uuid));
}

const getAllActions = async (req, res) => {
    debug('find all actions...');
    return res.send(await repo.findAll());
}

const notifyActionCommunicator = async (req, res) => {
    repo.findByOriginIdentifierWhereActive(req.params.uuid).then(
        (data) => {
            data.forEach(async (act) => {
                act = Action.updateLifetime(act);
                await repo.update(act);
            })
            return res.json(data);
        }
    );
}

exports.notify = notifyActionCommunicator
exports.getAllActions = getAllActions;
exports.getActions = getActions;
exports.inscribe = inscribe;