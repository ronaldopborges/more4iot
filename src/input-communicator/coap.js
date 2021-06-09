'use strict';

const coap = require('coap');
const debug = require('debug')('input:COAP');

module.exports = async (path) => {
    debug('coap server starting...');
    const server = coap.createServer()
    server.on('request', function (req, res) {
        const url = req.url.split('/')[1];
        if (path != url) { res.end("path not equal"); return; }

        debug('received request from coap protocol...');
        debug('send to validation and sender');
        sender(req.payload.toString());
        res.end("data received [in process]");
    })

    server.listen(() => {
        debug('[*] CoAp server online');
    })
}