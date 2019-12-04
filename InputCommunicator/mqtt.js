const mqtt = require('mqtt');
const addresses = require('../config/addresses');

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
