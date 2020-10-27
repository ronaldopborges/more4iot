const services = Object.freeze({
    "ActionManager": "ActionManager",
    "DeviceManager": "DeviceManager",
    "DataManager": "DataManager"
})
const methods = Object.freeze({
    "DataManager": {
        "PersistData": "PersistData",
        "GetData": "GetData",
        "GetLastData": "GetLastData",
        "GetAllData": "GetAllData",
        "DeleteData": "DeleteData"
    }, "DeviceManager": {
        "InscribeDevice": "InscribeDevice",
        "GetDevice": "GetDevice",
        "GetAllDevices": "GetAllDevices",
        "UpdateDevice": "UpdateDevice",
        "DeleteDevice": "DeleteDevice"

    }, "ActionManager": {
        "InscribeAction": "InscribeAction",
        "GetActions": "GetActions",
        "GetAllActions": "GetAllActions"

    }
})
const protocols = Object.freeze({
    "MQTT": "MQTT",
    "AMQP": "AMQP",
    "REST": "REST",
    "COAP": "COAP"
})

const topic = 'iotufersa';

exports.services = services;
exports.methods = methods;
exports.protocols = protocols;
exports.topic = topic;