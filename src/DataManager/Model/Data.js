const { Schema, model } = require('mongoose');

const DataSchema = new Schema(
    {
        deviceUuid: {
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
        object: {
            type: Schema.Types.Mixed,
            required: true
        },
    },
    {
        timestamps: true,
    });


exports.db = model('Data', DataSchema);