const { Schema, model } = require('mongoose');

const ActionSchema = new Schema(
    {
        uuidFrom: {
            type: String,
            required: true,
        },
        uuidTo: {
            type: String,
            required: true,
        },
        data: {
            type: Schema.Types.Mixed,
            default: {}
        },
        commands: {
            type: Schema.Types.Mixed,
            default: {}
        },
        lifetime: {
            validity: {
                type: Boolean,
                default: true,
                required: true,
            },
            count: {
                type: Number,
                default: 0,
                required: true
            }
        },
        status: {
            type: Boolean,
            default: true,
            required: true
        },
    },
    {
        timestamps: true,
    });

db = model('Action', ActionSchema);

const updateLifetime = (action) => {
    if (action.lifetime.validity == true) {
        action.lifetime.count -= 1;
        if (action.lifetime.count == 0)
            action.status = false;
        return action;
    }
};

exports.db = db;
exports.updateLifetime = updateLifetime;