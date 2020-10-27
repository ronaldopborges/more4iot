const coap = require('coap') // or coap

/**
 * Turns online a COAP server, which will redirect all messages received to the global sender from index.js
 */
module.exports = () => {
    server = coap.createServer()

    server.on('request', function (req, res) {
        sender(req.payload.toString());
        res.end();
        //console.log(req.payload.toString());
        //sender(req.url.split('/')[1]);
        //res.end('Hello ' + req.url.split('/')[1] + '\n')
    })

    server.listen(function () {
        console.log('[*] CoAp server online.')
    })
}