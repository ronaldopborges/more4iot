const { Schema, model } = require('mongoose');
const device = require('uuid/v1');

const DeviceSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        },
        resource: [{
            type: String
        }],
        timeToGenerateData: {
            type: Number,
            required: true
        },
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
    
    const generateUuid = async () => {
        const hash = await device();
        return hash;
    };

    
exports.db = model('Device', DeviceSchema);
exports.generateUuid = generateUuid;