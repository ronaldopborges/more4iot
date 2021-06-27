const coap = require('coap');
const debug = require('debug')('action:coap');

const coapDispatcher = async (uri, ids, data) => {
  ids.forEach((id) => {
    debug(`dispatcher: ${id}`);
    debug(`dispatcher: ${JSON.stringify(data)}`);
    let r = uri.split('/');
    debug(r);
    const req = coap.request({
      host: r[0].split(':')[0],
      port: r[0].split(':')[1],
      method: 'POST',
      confirmable: false,
      pathname: r[1],
    });

    req.write(JSON.stringify(data));

    /* req.on('response', (res) => {
      res.pipe(process.stdout);
      res.on('end', () => {
        process.exit(0);
      });
    }); */

    req.end();
  });
};

exports.coapDispatcher = coapDispatcher;
