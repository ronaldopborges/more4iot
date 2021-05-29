const repo = require('../repository/ResourceRepository');
const Resource = require("../model/Resource");
const debug = require('debug')('resource:controller')

const inscribe = async (req, res) => {
    resource = req.body;
    resource.uuid = await Resource.generateUuid();
    response = await repo.save(resource);
    return res.json(response);
}

const update = async (req, res) => {
    debug('updating resource...');
    debug(`resource packet: ${JSON.stringify(req.body)}`);
    resource = req.body;
    const response = await repo.update(resource);
    if (response)
        return res.json(response);
    else return res.send(false);
}

const find = async (req, res) => {
    const response = await repo.findByUuid(req.params.uuid);
    if (response)
        return res.json(response);
    else return res.send({});
}

const check = async (req, res) => {
    const response = await repo.findByUuid(req.params.uuid);
    if (response)
        return res.json(true);
    else return res.send(false);
}

const getAll = async (req, res) => {
    const response = await repo.findAll();
    if (response)
        return res.json(response);
    else return res.send(false);
}

const deleteResource = async (req, res) => {
    if (req.params.uuid != undefined) {
        try {
            const response = await repo.delete(req.params.uuid);
            return res.send(response);
        } catch (error) {
            return res.json({ error: error.message })
        }
    } else
        return res.send(false);
}

exports.delete = deleteResource;
exports.getAll = getAll;
exports.find = find;
exports.check = check;
exports.update = update;
exports.inscribe = inscribe;
