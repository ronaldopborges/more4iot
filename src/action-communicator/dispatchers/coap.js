const coap = require('coap');
const debug = require('debug')('action:coap');

const coapDispatcher = async (uri, ids, data) => {
  ids.forEach((id) => {
    console.log(`dispatcher: ${id}`);
    const req = coap.request(uri);

    req.write(JSON.stringify(data));

    req.end();
  });
};

exports.coapDispatcher = coapDispatcher;
