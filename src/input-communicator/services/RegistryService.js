const axios = require('axios');

const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('../config/registry');

const build = (name, ip, port) => {
  return { name: name, ipv4: ip, port: port };
}

const sendRegistry = async (name, ip, port) => {
  return await axios.post(
    `http://${SERVICE_REGISTRY_HOST}:${SERVICE_REGISTRY_PORT}`,
    build(name, ip, port)
  );
}

const getService = async (name) => {
  return await axios.get(
    `http://${SERVICE_REGISTRY_HOST}:${SERVICE_REGISTRY_PORT}/${name}`
  );
}

const getServiceIPAndPort = async (name) => {

  const { data } = await getService(name);

  return `http://${data.ipv4}:${data.port}`;
}

exports.getServiceIPAndPort = getServiceIPAndPort;
exports.sendRegistry = sendRegistry;
exports.getService = getService;