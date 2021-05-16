const mqtt = require('mqtt');
const axios = require('axios');
const coap = require('coap');
const amqp = require('amqplib/callback_api');

const {SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('../config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST,SERVICE_REGISTRY_PORT);
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const {DEVICE_MANAGER_NAME} = require('@iotufersa/more4iot-js-sdk/config/services');
const {BROKER_AMQP, MQTT_HOST, MQTT_PORT, PUBLISHER_USER, PUBLISHER_PASSWORD} = require('../config/brokers');
const protocols = require('@iotufersa/more4iot-js-sdk/config/protocols');

/**
 * Handles a REST request which contains an action object. From this action object, gets the attribute uuidAtuador, with it, requests the DeviceManager to get this actuator's URL and PROTOCOL and then send the action object to the actuator through his url using the correct protocol
 * @param  {Request} req The REST request with the body which contains the Action Object with the  UUID of the target device get his address and protocol, to send him the Action Object
 * @param  {Response}   res   Response, to return a response to the requester(success/error/some data, etc)  
 */
const sendToActuator = async (req, res) => {
    const actions = req.body;
    const message = {
        uuidSensor: "0",
        command: {}
    };
    actions.forEach(async (action, index) => {
        message.command = action.dataAtuador;
        message.uuidSensor = action.uuidSensor;
        const deviceUrl = await rg.getServiceIPAndPort(DEVICE_MANAGER_NAME);
        axios.get(`${deviceUrl}/${config.req_deviceManagerRouteCheckDevice}/${action.uuidAtuador}`).then(res => {
            if (res.data) {
                console.log(`Atuador: ${action.uuidAtuador}, sensor: ${action.uuidSensor}, Comando: ${action.command} Endereço URI do atuador: ${res.data.uri}`);
                if (res.data.protocol == protocols.REST) {
                    axios.post(`${res.data.uri}`, message).then((res) => {
                    }).catch((error) => {
                        console.log(error);
                    })
                }
                if (res.data.protocol == protocols.MQTT) {
                    var mqttOptions = {
                        host: MQTT_HOST,
                        port: MQTT_PORT,
                        username: PUBLISHER_USER,
                        password: PUBLISHER_PASSWORD,
                        protocol:'mqtt'
                    };
                    
                    const client = mqtt.connect(mqttOptions);
                    client.subscribe(res.data.uri, function (err) {
                        if (!err) {
                            client.publish(res.data.uri, JSON.stringify(message));
                        }
                    })
                }
                if (res.data.protocol == protocols.AMQP) {
                    try {
                        amqp.connect(BROKER_AMQP, (err, conn) => {
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
            }
        }).catch((error) => {
            console.log(error);
        })
    })
    return res.send(true);
}

exports.sendToActuator = sendToActuator;