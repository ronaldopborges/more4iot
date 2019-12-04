const Data = require('../Model/Data');

const save = async dataparam => {
    try {
        const newData = await Data.db.create(dataparam);
        if (newData)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}
const findLastByUuid = async dataparam => {
    try {
        const dataExists = await Data.db.findOne({ uuid: dataparam }, {}, { sort: { 'createdAt': -1 } });
        if (dataExists) {
            return dataExists;
        } else
            return false;
    } catch (error) {
        return false;
    }

}
const findByUuid = async dataparam => {
    try {
        const oneExists = await Data.db.findOne({ uuid: dataparam });
        if (oneExists) {
            const dataExists = await Data.db.find({ uuid: dataparam });
            return dataExists;
        }
        else
            return false;
    } catch (error) {
        return false;
    }

}
const findAll = async () => {
    try {
        const all = await Data.db.find({})
        if (all)
            return all;
        else
            return false;
    } catch (error) {
        return false;
    }
}
const deleteByUuid = async dataparam => {
    try {
        const dataExists = await Data.db.findOne({ uuid: dataparam });
        if (dataExists) {
            await Data.db.deleteMany({ uuid: dataparam });
            return true;
        }
        else
            return false;
    } catch (error) {
        return false;
    }
}

exports.deleteByUuid = deleteByUuid;
exports.findAll = findAll;
exports.findByUuid = findByUuid;
exports.findLastByUuid = findLastByUuid;
exports.save = save;