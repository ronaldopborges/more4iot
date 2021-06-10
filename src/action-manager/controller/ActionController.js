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
        mqtt_sender([act]);
    } else {
        debug('inscribe action...');
    }

    act = await repo.save(req.body);

    return res.send(act);
}

const getActions = async (req, res) => {
    debug('find actions from uuid...');
    return res.send(await repo.findAllByCreator(req.params.uuid));
}

const getAllActions = async (req, res) => {
    debug('find all actions...');
    return res.send(await repo.findAll());
}

const deleteAction = async (req, res) => {
    debug('delete action...');
    return res.send(await repo.delete(req.params.id));
}

exports.getAllActions = getAllActions;
exports.getActions = getActions;
exports.inscribe = inscribe;
exports.delete = deleteAction