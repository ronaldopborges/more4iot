const RegistryRepository = require('../repository/RegistryRepository');
const debug = require('debug')('registry:controller');

const inscribeRegistry = async (req, res) => {
    debug(`registry service inscribe: ${req.body}`);
    response = await RegistryRepository.saveByServiceName(req.body);
    debug(`registry service inscribe: ${response}`);
    return res.json(response);
}

const getRegistry = async (req, res) => {
    debug(`registry service receiver request: ${req.params.name}`);
    const response = await RegistryRepository.findByServiceName(req.params.name);
    if (response) {
        debug(`receiver request: ${req.params.name}`);
        return res.json(response);
    }
    else return res.send(false);
}

exports.getRegistry = getRegistry;
exports.inscribeRegistry = inscribeRegistry;
