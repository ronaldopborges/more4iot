const Device = require('../model/device');

const save = async device => {
    try {
        const newDevice = await Device.db.create(device);
        if (newDevice)
            return newDevice;
    } catch (error) {
        console.log(error);
    }

    return false;
}

const update = async deviceUpdated => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceUpdated.uuid });
        if (deviceExists) {
            const device = await Device.db.findByIdAndUpdate(deviceExists._id, deviceUpdated, { new: true })
            return device;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

const findByUuid = async deviceUuid => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceUuid });
        if (deviceExists)
            return deviceExists;
    } catch (error) {
        console.log(error);
    }
    return false;
}

const findAll = async () => {
    try {
        const all = await Device.db.find({})
        if (all)
            return all;
    } catch (error) {
        console.log(error);
    }

    return false;
}

const deleteh = async deviceUuid => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceUuid });
        if (deviceExists) {
            await Device.db.findByIdAndRemove(deviceExists._id);
            return true;
        }
    } catch (error) {
        console.log(error);
    }

    return false;
}

exports.delete = deleteh;
exports.findAll = findAll;
exports.findByUuid = findByUuid;
exports.update = update;
exports.save = save;


