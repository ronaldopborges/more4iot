const mqtt = require('mqtt');

const { MQTT_HOST, MQTT_PORT, PUBLISHER_USER, PUBLISHER_PASSWORD } = require('../config/brokers');
const debug = require('debug')("action:MQTT:dispatcher");

module.exports = async (topic, ids, act) => {

  var options = {
    host: MQTT_HOST,
    port: MQTT_PORT,
    username: PUBLISHER_USER,
    password: PUBLISHER_PASSWORD,
    protocol: 'mqtt'
  };

  debug("publisher starting...")
  let client = mqtt.connect(options);

  client.on('connect', () => {
    debug('MQTT publisher connected...');
    debug(`send action to ${topic} topic...`);
    const data = JSON.stringify(act);
    debug(`ids is array: ${Array.isArray(ids)}`);
    ids.forEach(async (id) => {
      debug(`action packet: ${data}`);
      debug(`resource uuid: ${id}`);
      client.publish(topic, data, null, () => {
        debug('action sent...');
      });
    });
    debug('actions sent... closing connection...');
    client.end();
  });

}