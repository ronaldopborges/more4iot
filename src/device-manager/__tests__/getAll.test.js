const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test004' + '?retryWrites=true&w=majority'
const Device = require('../model/Device')
const routeConfig = require('../config/routesConfig')

jest.setTimeout(30000);
setupDB(databaseName);

const seedsDevice = [{
  "uuid": "007",
  "latDefault": 0,
  "lonDefault": 0,
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "typeDevice": "Sensor"
}, {
  "uuid": "006",
  "latDefault": 0,
  "lonDefault": 0,
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "typeDevice": "Sensor"
}, {
  "uuid": "008",
  "latDefault": 0,
  "lonDefault": 0,
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "typeDevice": "Sensor"
},
]
it("Should return all devices stored in database", async done => {
  for (const d of seedsDevice) {
    const seededDevice = new Device.db(d)
    await seededDevice.save()

  }

  const res = await request.get(`/${routeConfig.deviceManagerRouteGetAll}`)

  expect(res.body[0].describe).toBeTruthy()

  done()
})