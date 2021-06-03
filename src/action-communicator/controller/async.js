const axios = require('axios');

const mqtt_dispatcher = require('../dispatchers/mqtt');
//const coap_dispatcher = require('../dispatchers/coap');
const http_rest_dispatcher = require('../dispatchers/http_rest');
const debug = require('debug')('action:resolver');
const protocols = require('@iotufersa/more4iot-js-sdk/config/protocols');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('../config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const { RESOURCE_MANAGER_NAME } = require('@iotufersa/more4iot-js-sdk/config/services');
const { resourceManagerRouteFind } = require('@iotufersa/more4iot-js-sdk/config/routes');

const resolve = async (act) => {
  if (!act) {
    debug('action undefined...');
    return;
  }
  if (!act.scope) {
    debug('scope undefined...');
    return;
  }
  debug('action received...');
  debug('preparing dispatch..')
  const ids = act.receiver.identifiers;
  if (ids) {
    const protocol = act.receiver.protocol;
    const uri = act.receiver.uri;
    const msg = { creator: act.creator, data: act.scope.data, commands: act.scope.commands };
    if (protocol && uri) {
      dispatcher(protocol, uri, ids, msg);
    } else {
      debug('receiver protocol or uri undefined...');
      debug('preparing dispatch for each resource...');
      debug('getting resource manager host and port');
      const resourceUrl = await rg.getServiceIPAndPort(RESOURCE_MANAGER_NAME);
      debug('getting protocols and uri...');
      if (!resourceUrl) {
        debug('resource url not found...');
        return;
      }
      ids.forEach(async (id) => {
        const reqResource = await axios.get(`${resourceUrl}/${resourceManagerRouteFind}/${id}`);
        debug(`resource: ${JSON.stringify(reqResource.data)}`);
        const resource = reqResource.data;
        if (resource && resource.protocol && resource.uri) {
          dispatcher(resource.protocol, resource.uri, [id], msg);
        }
      });
    }
  } else {
    debug('receiver identifiers undefined...')
    return;
  }
}

const dispatcher = async (protocol, uri, ids, data) => {
  switch (protocol) {
    case protocols.MQTT:
      debug('send with mqtt...');
      mqtt_dispatcher(uri, ids, data);
      break;
    case protocols.HTTP_REST:
      debug('send with http_rest...');
      //http_rest_dispatcher(resource.uri, ids, data);
      break;
    case protocols.COAP:
      debug('send with coap...');
      //coap_dispatcher(resource.uri, ids, data);
      break;
    default:
      debug('protocol not identified...');
  }
}

exports.resolve = resolve;
