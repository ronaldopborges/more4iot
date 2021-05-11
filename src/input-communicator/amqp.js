const amqp = require('amqplib/callback_api');
const { SUBSCRIBER_USER, SUBSCRIBER_PASSWORD, AMQP_HOST, AMQP_PORT } = require('./config/brokers');

/**
 * Connect to the AMQP broker from addresses and subscribe to a topic passed as parameter. Redirects any messages received in this topic to the global sender from index.js
 * @param  {String} amqptopic The topic name to subscribe to on the AMQP broker
 */
module.exports = async (amqptopic) => {

    var amqpOptions = {
        protocol: 'amqp',
        hostname: AMQP_HOST,
        port: AMQP_PORT,
        username: SUBSCRIBER_USER,
        password: SUBSCRIBER_PASSWORD,
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