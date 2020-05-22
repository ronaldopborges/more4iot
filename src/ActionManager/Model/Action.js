const { Schema, model } = require('mongoose');

const ActionSchema = new Schema(
    {
        uuidAtuador: {
            type: String,
            required: true,
        },
        uuidSensor: {
            type: String,
            required: true,
        },
        command: {
            type: String,
            required: true,
        },
        lifetime: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            required: true
        },
    },
    {
        timestamps: true,
    });

db = model('Action', ActionSchema);
const updateLifetime = actionparam => {
    const response = actionparam;
    if (response) {
        response.lifetime = response.lifetime - 1;
        if (response.lifetime == 0)
            response.status = false;
        return response;
    }
};


exports.db = db;
exports.updateLifetime = updateLifetime;