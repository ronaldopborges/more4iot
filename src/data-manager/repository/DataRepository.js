const Data = require('../model/Data');

const save = async dataObj => {
    try {
        const newData = await Data.db.create(dataObj);
        if (newData)
            return true;
        else
            return false;
    } catch (error) {
        return false;
    }
}

const findLastByUuid = async uuid => {
    try {
        const dataExists = await Data.db.findOne({ uuid: uuid }, {}, { sort: { 'createdAt': -1 } });
        if (dataExists) {
            return dataExists;
        } else
            return false;
    } catch (error) {
        return false;
    }

}

const findByUuid = async uuid => {
    try {
        const oneExists = await Data.db.findOne({ uuid: uuid });
        if (oneExists) {
            const dataExists = await Data.db.find({ uuid: uuid });
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

const deleteByUuid = async uuid => {
    try {
        const dataExists = await Data.db.findOne({ uuid: uuid });
        if (dataExists) {
            await Data.db.deleteMany({ uuid: uuid });
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