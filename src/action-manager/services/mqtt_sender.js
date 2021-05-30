const mqtt = require('mqtt');

const { async_action } = require('@iotufersa/more4iot-js-sdk/config/routes');
const { MQTT_HOST, MQTT_PORT, PUBLISHER_USER, PUBLISHER_PASSWORD } = require('../config/brokers');
const debug = require('debug')("action:MQTT");

module.exports = async (actions) => {

  var mqttOptions = {
    host: MQTT_HOST,
    port: MQTT_PORT,
    username: PUBLISHER_USER,
    password: PUBLISHER_PASSWORD,
    protocol: 'mqtt'
  };

  debug("MQTT publisher starting...")
  let client = mqtt.connect(mqttOptions);

  client.on('connect', () => {
    debug('MQTT publisher connected...');
    debug(`send actions to ${async_action} topic...`);
    actions.forEach(async (act) => {
      const data = JSON.stringify(act);
      debug(`action packet: ${data}`);
      client.publish(async_action, data, null, () => {
        debug('action sent...');
      });
    });
    debug('actions sent... closing connection...');
    client.end();
  });

}