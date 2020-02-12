const Device = require('../model/Device')

const save = async deviceparam => {
    try {
        const newDevice = await Device.db.create(deviceparam);
        if (newDevice)
            return true;
        else return false;
    } catch (error) {
        return false;
    }
}
const update = async deviceparam => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceparam.uuid });
        if (deviceExists) {
            const device = await Device.db.findByIdAndUpdate(deviceExists._id, deviceparam, { new: true })
            return device;
        } else
            return false;
    } catch (error) {
        return false;
    }

}
const findByUuid = async deviceparam => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceparam });
        if (deviceExists)
            return deviceExists;
        else
            return false;
    } catch (error) {
        return false;
    }

}
const findAll = async () => {
    try {
        const all = await Device.db.find({})
        if (all)
            return all;
        else
            return false;
    } catch (error) {
        return false;
    }
}
const deleteh = async deviceparam => {
    try {
        const deviceExists = await Device.db.findOne({ uuid: deviceparam });
        if (deviceExists) {
            await Device.db.findByIdAndRemove(deviceExists._id);
            return true;
        }
        else
            return false;
    } catch (error) {
        return false;
    }
}

exports.delete = deleteh;
exports.findAll = findAll;
exports.findByUuid = findByUuid;
exports.update = update;
exports.save = save;
