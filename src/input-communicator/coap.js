'use strict';

const coap = require('coap');
const debug = require('debug')('input:COAP');

module.exports = async () => {
    debug('coap server starting...');
    const server = coap.createServer()
    server.on('request', function (req, res) {
        debug('received request...');
        debug('sent to validation and sender');
        sender(req.payload.toString());
        res.end();
    })

    server.listen(() => {
        debug('[*] CoAp server online');
    })
}