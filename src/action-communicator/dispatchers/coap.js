const coap = require('coap');
const debug = require('debug')('action:coap');

const coapDispatcher = async (uri, ids, data) => {
  ids.forEach((id) => {
    console.log(`dispatcher: ${id}`);
    console.log(`dispatcher: ${JSON.stringify(data)}`);
    const req = coap.request(uri);

    req.write(JSON.stringify(data));

    req.on('response', (res) => {
      res.pipe(process.stdout);
      res.on('end', () => {
        process.exit(0);
      });
    });

    req.end();
  });
};

exports.coapDispatcher = coapDispatcher;
