const axios = require('axios');
const debug = require('debug')('action:http');

const httpDispatcher = async (uri, ids, data) => {
  ids.forEach((id) => {
    try {
      debug('sending with http/rest...');
      const dataStr = JSON.stringify(data);
      debug(`Scope: ${dataStr}`);
      const res = axios.post(uri, dataStr);
    } catch (error) {
      debug(error);
      console.log(error);
    }
  });
};

exports.httpDispatcher = httpDispatcher;
