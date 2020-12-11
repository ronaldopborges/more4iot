const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test002' + '?retryWrites=true&w=majority'
const Device = require('../model/Device')
const routeConfig = require('../config/routesConfig')

jest.setTimeout(30000);
setupDB(databaseName);

const seedDevice = {
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
}
const seedDevice2 = {
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
}

it("Should return a specific searched device", async done => {
  const seededDevice = new Device.db(seedDevice)
  await seededDevice.save()

  const res = await request.get(`/${routeConfig.deviceManagerRouteCheckDevice}/007`)

  expect(res.body.uuid).toBe("007")

  done()
})

it("Should return false when trying to search for nonexistent device", async done => {
  const seededDevice2 = new Device.db(seedDevice2)
  await seededDevice2.save()

  const res2 = await request.get(`/${routeConfig.deviceManagerRouteCheckDevice}/010`)

  expect(res2.body).toBeFalsy()

  done()
})

