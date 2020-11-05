const coap  = require('coap') // or coap
  ,   req   = coap.request('coap://localhost/Matteo')

const msg   = {
  service: "GerenciadorDeDispositivos",
  method: "RegistrarDispositivo",
  data:
  {
    lat: "29",
    lon: "27",
    resource: ["temperatura", "umidade"],
    timeToGenerateData: "9",
    uri: "195.598.565/device/2",
    protocol: "teste",
    describe: "sensor para blablabla",
    typeDevice: "sensor"
  }
}

req.write(JSON.stringify(msg));

req.on('response', function (res) {
  res.pipe(process.stdout)
  res.on('end', function () {
    process.exit(0)
  })
})

req.end()