const mqtt      = require('mqtt');
const addresses = require('./config/addresses');

/**
 * Connect to the MQTT broker from addresses and subscribe to a topic passed as parameter. Redirects any messages received in this topic to the global sender from index.js
 * @param  {String} topic The topic name to subscribe to on the MQTT broker
 */
module.exports = topic => {
try {
    const client = mqtt.connect(addresses.mqttBroker)
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
