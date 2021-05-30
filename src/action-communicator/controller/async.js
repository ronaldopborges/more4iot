const debug = require('debug')('action:async');
const mqtt_dispatcher = require('../dispatchers/mqtt');
const protocols = require('@iotufersa/more4iot-js-sdk/config/protocols');

const resolve = async (act) => {
  if (act === undefined) {
    debug('action undefined...');
    return;
  }
  debug('action received...');
  debug('preparing dispatch..')
  const ids = act.receiver.identifiers;
  if (ids !== undefined){
    const protocol = act.receiver.protocol;
    const uri = act.receiver.uri;
    if(protocol !== undefined && uri !== undefined && protocol !== null && uri !== null){
      const msg = {creator: act.creator, data: act.scope.data, commands: act.scope.commands};
      if(protocol == protocols.MQTT){
        debug('send with mqtt...');
        mqtt_dispatcher(uri,ids,msg);
      }
    } else {
      debug('receiver protocol or uri undefined...');
      debug('preparing dispatch for identifiers...');
    }
  } else {
    debug('receiver identifiers undefined...')
    return;
  }
}

exports.resolve = resolve;
