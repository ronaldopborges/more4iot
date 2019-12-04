const config = require('../../config/routesConfig');
const addresses = require('../../config/addresses');
const { services, methods, protocols } = require('../../config/options');
const axios = require('axios');
const mqtt = require('mqtt');
const amqp = require('amqplib/callback_api');
const client = mqtt.connect(addresses.mqttBroker);
const coap = require('coap');

const sendToActuator = async (req, res) => {
    const actions = req.body;
    const message = {
        uuidSensor: "0",
        command: "0"
    };
    var flag = 0;
    actions.forEach((action, index) => {
        message.command = action.command;
        message.uuidSensor = action.uuidSensor;
        axios.get(`${addresses.req_deviceManagerIpAndPort}${config.req_deviceManagerRouteCheckDevice}${action.uuidAtuador}`).then(res => {
            if (res.data) {
                //  console.log(`Atuador: ${action.uuidAtuador}, sensor: ${action.uuidSensor}, Comando: ${action.command} Endereço URI do atuador: ${res.data.uri}`);
                if (res.data.protocol == protocols.REST) {
                    axios.post(`${res.data.uri}`, message).then((res) => {
                    }).catch((error) => {
                        console.log(error);
                    })
                }
                if (res.data.protocol == protocols.MQTT) {
                    client.subscribe(res.data.uri, function (err) {
                        if (!err) {
                            client.publish(res.data.uri, JSON.stringify(message));
                        }
                    })

                }
                if (res.data.protocol == protocols.AMQP) {
                    try {
                        amqp.connect(addresses.amqpBroker, (err, conn) => {
                            if (conn != undefined) {
                                conn.createChannel((err, ch) => {
                                    ch.assertQueue(res.data.uri, { durable: false });
                                    ch.sendToQueue(res.data.uri, new Buffer.from(JSON.stringify(message)));
                                });
                                // conn.close();
                            } else {
                                console.log("Erro ao conectar ao servidor AMQP.")
                            }
                        });
                    }
                    catch (e) {
                        console.log("Erro ao conectar ao servidor AMQP.")
                    }
                }
                if (res.data.protocol == protocols.COAP) {
                    req = coap.request(res.data.uri)
                    req.write(JSON.stringify(message));
                    req.end()
                }
            } else {
                console.log(res.data);
                flag = 1;
            }
        }).catch((error) => {
            console.log(error);
            flag = 1;
        })
    })
    if (!flag)
        return res.send(true);
    else
        return res.send(false);
}

exports.sendToActuator = sendToActuator;