const { Schema, model } = require('mongoose');
const device = require('../node_modules/uuid/v1');

const DeviceSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
        },
        latDefault: {
            type: Number,
            required: true,
        },
        lonDefault: {
            type: Number,
            required: true,
        },
        resource: [{
            type: String
        }],
        uri: {
            type: String,
            required: true
        },
        protocol: {
            type: String,
            required: true
        },
        describe: {
            type: String,
            required: true
        },
        typeDevice: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    });

/**
 * Generates an unique id for a new device
 */
const generateUuid = async () => {
    const hash = await device();
    return hash;
};


exports.db = model('Device', DeviceSchema);
exports.generateUuid = generateUuid;