const mqtt = require('mqtt');
const {MQTT_HOST,MQTT_PORT, SUBSCRIBER_USER, SUBSCRIBER_PASSWORD} = require('./config/brokers');

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
        protocol:'mqtt'
    };

    let client = mqtt.connect(mqttOptions);
    
    client.on('connect', () => {
        client.subscribe(topic);
        console.log("[*] Inscrito no topico MQTT: %s.", topic);
    });

    client.on('message', (topic, message) => {
        sender(message.toString());
    });
}
