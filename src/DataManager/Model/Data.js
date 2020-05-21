const { Schema, model } = require('mongoose');

const DataSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
            required: true,
        },
        lon: {
            type: Number,
            required: true,
        },
        resource: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    });


exports.db = model('Data', DataSchema);