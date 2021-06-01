const debug = require('debug')('action:resolver');
const mqtt_dispatcher = require('../dispatchers/mqtt');
const axios = require('axios');
const protocols = require('@iotufersa/more4iot-js-sdk/config/protocols');
const {SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('../config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const {RESOURCE_MANAGER_NAME} = require('@iotufersa/more4iot-js-sdk/config/services');
const {resourceManagerRouteFind} = require('@iotufersa/more4iot-js-sdk/config/routes');

const resolve = async (act) => {
  if (act == undefined) {
    debug('action undefined...');
    return;
  }
  if (act.scope == undefined) {
    debug('scope undefined...');
    return;
  }
  debug('action received...');
  debug('preparing dispatch..')
  const ids = act.receiver.identifiers;
  if (ids !== undefined){
    const protocol = act.receiver.protocol;
    const uri = act.receiver.uri;
    const msg = {creator: act.creator, data: act.scope.data, commands: act.scope.commands};
    if(protocol !== undefined && uri !== undefined && protocol !== null && uri !== null){
      if(protocol == protocols.MQTT){
        debug('send with mqtt...');
        mqtt_dispatcher(uri,ids,msg);
      }
    } else {
      debug('receiver protocol or uri undefined...');
      debug('preparing dispatch for each identifier...');
      debug('getting resource manager host and port');
      const resourceUrl = await rg.getServiceIPAndPort(RESOURCE_MANAGER_NAME);
      debug('getting protocols and uri...');
      if(!resourceUrl){
        debug('resource service not working...');
        return;
      }
      ids.forEach(async (id) => {
        const reqResource = await axios.get(`${resourceUrl}/${resourceManagerRouteFind}/${id}`);
        debug(`resource: ${JSON.stringify(reqResource.data)}`);
        const resource = reqResource.data;
        if(resource){
          if(protocols.MQTT == resource.protocol){
            debug('sending with mqtt...');
            mqtt_dispatcher(resource.uri, [id], msg);
          }
        }
      });
    }
  } else {
    debug('receiver identifiers undefined...')
    return;
  }
}

exports.resolve = resolve;
