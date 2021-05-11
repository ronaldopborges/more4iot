const mqtt = require('mqtt');
const {MQTT_HOST,MQTT_PORT, SUBSCRIBER_USER, SUBSCRIBER_PASSWORD} = require('./config/brokers');

/**
 * Connect to the MQTT broker from addresses and subscribe to a topic passed as parameter. Redirects any messages received in this topic to the global sender from index.js
 * @param  {String} topic The topic name to subscribe to on the MQTT broker
 */

module.exports = async (topic) => {

    var mqttOptions = {
        host: 'mqtt://'+MQTT_HOST,
        port: MQTT_PORT,
        clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
        username: SUBSCRIBER_USER,
        password: SUBSCRIBER_PASSWORD,
    };

    try {
        const client = mqtt.connect('mqtt://'+MQTT_HOST, mqttOptions)
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
