const amqp = require('amqplib/callback_api');
const addresses = require('./config/addresses');
const { MQTT_SUBSCRIBER_USER, MQTT_SUBSCRIBER_PASSWORD } = require('./config/env');

/**
 * Connect to the AMQP broker from addresses and subscribe to a topic passed as parameter. Redirects any messages received in this topic to the global sender from index.js
 * @param  {String} amqptopic The topic name to subscribe to on the AMQP broker
 */
module.exports = async (amqptopic) => {

    var amqpOptions = {
        protocol: 'amqp',
        hostname: addresses.hostnameAmqp,
        port: addresses.amqpPort,
        username: MQTT_SUBSCRIBER_USER,
        password: MQTT_SUBSCRIBER_PASSWORD,
        locale: 'en_US',
        frameMax: 0,
        heartbeat: 0,
        vhost: '/'
    }

    try {
        amqp.connect(amqpOptions, (err, conn) => {
            if (conn != undefined) {
                conn.createChannel((err, ch) => {
                    ch.assertQueue(amqptopic, { durable: false });
                    ch.prefetch(1);
                    console.log(" [*] Inscrito no topico AMQP: %s.", amqptopic);
                    ch.consume(amqptopic, msg => {
                        sender(msg.content.toString());
                    }, { noAck: true });
                });
            } else
                console.log("Erro ao conectar-se ao servidor AMQP.")
        });
    } catch (e) {
        console.log("Erro ao conectar-se ao servidor AMQP.")
    }
}