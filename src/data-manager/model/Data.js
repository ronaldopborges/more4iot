const { Schema, model } = require('mongoose');

const DataSchema = new Schema(
    {
        uuid: {
            type: String,
            required: true,
        },
        lat: {
            type: Number,
        },
        lon: {
            type: Number,
        },
        data: {
            type: Schema.Types.Mixed,
            required: true
        },
    },
    {
        timestamps: true,
    });


exports.db = model('Data', DataSchema);