const mqtt = require('mqtt');
const { MQTT_SUBSCRIBER_USER, MQTT_SUBSCRIBER_PASSWORD } = require('./config/env');
const addresses = require('./config/addresses');

/**
 * Connect to the MQTT broker from addresses and subscribe to a topic passed as parameter. Redirects any messages received in this topic to the global sender from index.js
 * @param  {String} topic The topic name to subscribe to on the MQTT broker
 */

module.exports = (topic) => {

    var mqttOptions = {
        host: 'mqtt://'+addresses.hostnameMqtt,
        port: addresses.mqttPort,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        username: MQTT_SUBSCRIBER_USER,
        password: MQTT_SUBSCRIBER_PASSWORD,
    };

    try {
        const client = mqtt.connect('mqtt://'+addresses.hostnameMqtt, mqttOptions)
        client.on('connect', () => {
            client.subscribe(topic);
            console.log("[*] Inscrito no topico MQTT: %s.", topic);
        });

        client.on('message', (topic, message) => {
            sender(message.toString());
        });
    } catch (e) {
        console.log("Erro ao conectar-se ao servidor MQTT.")
    }
}
