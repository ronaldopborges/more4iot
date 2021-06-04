const repo = require('../repository/ActionRepository');
const Action = require('../model/Action');
const debug = require('debug')('action:resolver');
const mqtt_sender = require('../services/mqtt_sender');

const resolve = async (data) => {
  repo.findByOriginIdentifierWhereActive(data.uuid).then(
    (acts) => {
      debug(`actions found: ${acts.length}`);
      debug('updating actions lifetime...');
      for (var act of acts) {
        debug('updating lifetime starting...');
        Action.updateLifetime(act);
        repo.update(act).then(() => {
          let a = {creator: act.creator, scope: act.scope, receiver: act.receiver};
          if(a == false) {
            debug('action not updated...');
          }
          debug('updating lifetime finished...');
          if (!a.scope) {
            a.scope = {
              data: {},
              commands: {}
            };
            debug(`scope: ${a.scope}`);
          }

          if (!a.scope.commands) {
            debug(`act.scope.commands: ${a.scope.commands}`);
            a.scope.commands = {};
            debug(`act.scope.commands: ${a.scope.commands}`);
          }

          if (!a.scope.data || Object.keys(a.scope.data).length === 0) {
            debug(`act.scope.data: ${a.scope.data}`);
            a.scope.data = data.data;
            debug(`act.scope.data: ${a.scope.data}`);
          }

          mqtt_sender([a]);
        });
      }
    }
  );
}

exports.resolve = resolve;
