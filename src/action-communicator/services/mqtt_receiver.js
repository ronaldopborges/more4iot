const mqtt = require('mqtt');
const { MQTT_HOST, MQTT_PORT, SUBSCRIBER_USER, SUBSCRIBER_PASSWORD } = require('../config/brokers');
const debug = require('debug')("action:MQTT:resolve")

module.exports = async (topic) => {

  var options = {
    host: MQTT_HOST,
    port: MQTT_PORT,
    username: SUBSCRIBER_USER,
    password: SUBSCRIBER_PASSWORD,
    protocol: 'mqtt'
  };

  debug("subscribe starting...")
  let client = mqtt.connect(options);

  client.on('connect', () => {
    client.subscribe(topic);
    debug("[*] MQTT server online to topic: %s", topic);
  });

  client.on('message', (topic, message) => {
    debug('data received from async');
    debug(`data packet: ${message.toString()}`);
    const data = JSON.parse(message.toString());
    debug('data string to object parse...');
    debug('send data to async controller...');
    const control = require('../controller/async');
    control.resolve(data);
    debug('action sent to dispatch...');
  });
}