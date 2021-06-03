const coap = require('coap') // or coap

const coap_dispatcher = async (uri, ids, data) => {

  const options = {
    host: COAP_HOST,
    port: COAP_PORT,

  }

  const req = coap.request('coap://localhost/Matteo');

  req.write(JSON.stringify(msg));

  req.on('response', function (res) {
    res.pipe(process.stdout)
    res.on('end', function () {
      process.exit(0)
    })
  })

  req.end()

}

exports.coap_dispatcher = coap_dispatcher;