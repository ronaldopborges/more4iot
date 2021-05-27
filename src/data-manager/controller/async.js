const repo = require('../repository/DataRepository');

const save = async (data) => {
  return repo.save(data);
}

exports.save = save;