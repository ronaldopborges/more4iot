const { Schema, model } = require('mongoose');
const resource = require('uuid/v1');

const ResourceSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String
        },
        lat: {
            type: Number,
        },
        lon: {
            type: Number,
        },
        resource: [String],
        uri: {
            type: String,
            required: true
        },
        protocol: {
            type: String,
            required: true
        },
        describe: {
            type: String
        },
        isDevice: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    {
        timestamps: true,
    });

const generateUuid = async () => {
    const hash = await resource();
    return hash;
};

exports.db = model('Resource', ResourceSchema);
exports.generateUuid = generateUuid;