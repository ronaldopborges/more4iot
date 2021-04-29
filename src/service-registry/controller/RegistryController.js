const RegistryRepository = require('../repository/RegistryRepository');

const inscribeRegistry = async (req, res) => {
    response = await RegistryRepository.saveByServiceName(req.body);
    return res.json(response);
}

const getRegistry = async (req, res) => {
    const response = await RegistryRepository.findByServiceName(req.params.name);
    if (response)
        return res.json(response);
    else return res.send(false);
}

exports.getRegistry = getRegistry;
exports.inscribeRegistry = inscribeRegistry;
