const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test005' + '?retryWrites=true&w=majority'
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

it("Should successfully update an device description", async done => {
  const seededDevice = new Device.db(seedDevice)
  await seededDevice.save()

  const res = await request.put(`/${routeConfig.deviceManagerRouteUpdate}`).send({
    "uuid": "007",
    "latDefault": 0,
    "lonDefault": 0,
    "resource": [
      "Teste"
    ],
    "uri": "testeUri",
    "protocol": "MQTT",
    "describe": "ExampleUpdated",
    "typeDevice": "Sensor"
  })

  expect(res.body.describe).toBe("ExampleUpdated")

  done()
})

it("Should refuse to update a device with no matching type param", async done => {
  const seededDevice = new Device.db(seedDevice)
  await seededDevice.save()

  const res = await request.put(`/${routeConfig.deviceManagerRouteUpdate}`).send({
    "uuid": "001",
    "latDefault": "NO MATCHING PARAM",
    "lonDefault": 0,
    "resource": [
      "Teste"
    ],
    "uri": "testeUri",
    "protocol": "MQTT",
    "describe": "ExampleUpdated",
    "typeDevice": "Sensor"
  })

  expect(res.body).toBeFalsy()

  done()
})


it("Should refuse to update an nonexistent device uuid", async done => {
  const seededDevice = new Device.db(seedDevice)
  await seededDevice.save()

  const res = await request.put(`/${routeConfig.deviceManagerRouteUpdate}`).send({
    "uuid": "001",
    "latDefault": 0,
    "lonDefault": 0,
    "resource": [
      "Teste"
    ],
    "uri": "testeUri",
    "protocol": "MQTT",
    "describe": "ExampleUpdated",
    "typeDevice": "Sensor"
  })

  expect(res.body).toBeFalsy()

  done()
})