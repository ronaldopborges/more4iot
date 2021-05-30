const repo = require('../repository/ActionRepository');
const debug = require('debug')('action:controller');
const Action = require('../model/Action');
const mqtt_sender = require('../services/mqtt_sender');

const inscribe = async (req, res) => {
    let act = req.body;
    if (act.origin !== undefined && act.origin.length <= 0) {
        debug('action instant detected');
        debug('send action...');
        act.lifetime.validity = false;
        act.lifetime.count = 0;
        act.status = false;
        mqtt_sender(act);
    } else {
        debug('inscribe action...');
    }

    act = await repo.save(req.body);

    return res.send(act);
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