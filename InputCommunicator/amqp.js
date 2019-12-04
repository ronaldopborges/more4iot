const amqp = require('amqplib/callback_api');
const addresses = require('../config/addresses');


module.exports = (amqptopic) => {
    try {
        amqp.connect(addresses.amqpBroker, (err, conn) => {
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