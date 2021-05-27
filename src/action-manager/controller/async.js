const repo = require('../repository/ActionRepository');
const Action = require('../model/Action');
const debug = require('debug')('action:async');
const mqtt_sender = require('../services/mqtt_sender');

const resolve = async (data) => {
  const actions = await repo.findByActiveUuidSensor(data.deviceUuid);
  if (actions) {
    debug(`actions found: ${actions.length}`);
    debug('updating actions lifetime...');
    await actions.forEach(async (action) => {
      action = Action.updateLifetime(action);
      await repo.update(action);
    });
    debug('updating lifetime finished...');

    mqtt_sender(actions);
    
  } else {
    debug('no action found!');
    debug('discarding data...');
  }
}

exports.resolve = resolve;
