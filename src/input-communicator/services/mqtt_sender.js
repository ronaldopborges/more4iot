const mqtt = require('mqtt');

const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const { MQTT_HOST, MQTT_PORT, PUBLISHER_USER, PUBLISHER_PASSWORD } = require('../config/brokers');
const debug = require('debug')("input:MQTT")

module.exports = async (data) => {

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
    debug('send data to data topic...');
    data = JSON.stringify(data);
    debug(`data packet: ${data}`);
    client.publish(config.async_data, data,null,() => {
      debug('data sent... closing connection...');
      client.end();
    });
  });

}