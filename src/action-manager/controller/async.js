const repo = require('../repository/ActionRepository');
const Action = require('../model/Action');
const debug = require('debug')('action:async');
const mqtt_sender = require('../services/mqtt_sender');

const resolve = async (data) => {
  repo.findByOriginIdentifierWhereActive(data.deviceUuid).then(
    (acts) => {
      debug(`actions found: ${acts.length}`);
      debug('updating actions lifetime...');
      await acts.forEach(async (act) => {
        act = Action.updateLifetime(act);
        await repo.update(act);

        act.scope.data = data;
      });
      debug('updating lifetime finished...');

      mqtt_sender(acts);
    }
  );
}

exports.resolve = resolve;
