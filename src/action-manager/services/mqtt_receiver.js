const mqtt = require('mqtt');
const { MQTT_HOST, MQTT_PORT, SUBSCRIBER_USER, SUBSCRIBER_PASSWORD } = require('../config/brokers');
const debug = require('debug')("action:MQTT:receiver")

/**
 * Connect to the MQTT broker from addresses and subscribe to a topic passed as parameter. Redirects any messages received in this topic to the global sender from index.js
 * @param  {String} topic The topic name to subscribe to on the MQTT broker
 */
module.exports = async (topic) => {

  var mqttOptions = {
    host: MQTT_HOST,
    port: MQTT_PORT,
    username: SUBSCRIBER_USER,
    password: SUBSCRIBER_PASSWORD,
    protocol: 'mqtt'
  };

  debug("subscribe starting...")
  let client = mqtt.connect(mqttOptions);

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
    debug('data async actioned...');
  });
}