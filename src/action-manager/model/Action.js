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
        dataSensor: {
            type: Schema.Types.Mixed,
            required: true,
        },
        dataAtuador: {
            type: Schema.Types.Mixed,
            required: true,
        },
        lifetimeAtuacao: {
            lifetime: {
                type: Boolean,
                required: true,
            },
            quant: {
                type: Number,
                required: true
            }
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

const updateLifetime = (action) => {
    if (action.lifetime == true) {
        action.quant -= 1;
        if (action.quant == 0)
            action.status = false;
        return action;
    }
};

exports.db = db;
exports.updateLifetime = updateLifetime;