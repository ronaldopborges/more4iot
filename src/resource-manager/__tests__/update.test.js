const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test005' + '?retryWrites=true&w=majority'
const Resource = require('../model/Resource');
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName);

const seed01 = {
  "uuid": "007",
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "isDevice": true
}

it("Should successfully update an resource description", async done => {
  const seededDevice = new Resource.db(seed01)
  await seededDevice.save()

  const res = await request.put(`/${routeConfig.resourceManagerRouteUpdate}`).send({
    "uuid": "007",
    "resource": [
      "Teste"
    ],
    "uri": "testeUri",
    "protocol": "MQTT",
    "describe": "ExampleUpdated",
    "isDevice": true
  })

  expect(res.body.describe).toBe("ExampleUpdated")

  done()
})

it("Should refuse to update a resource with no matching type param", async done => {
  const seeded = new Resource.db(seed01)
  await seeded.save()

  const res = await request.put(`/${routeConfig.resourceManagerRouteUpdate}`).send({
    "uuid": "001",
    "lat": "NO MATCHING PARAM",
    "lon": 0,
    "resource": [
      "Teste"
    ],
    "uri": "testeUri",
    "protocol": "MQTT",
    "describe": "ExampleUpdated",
    "isDevice": true
  })

  expect(res.body).toBeFalsy()

  done()
})


it("Should refuse to update an nonexistent resource uuid", async done => {
  const seeded = new Resource.db(seed01)
  await seeded.save()

  const res = await request.put(`/${routeConfig.resourceManagerRouteUpdate}`).send({
    "uuid": "001",
    "lat": 0,
    "lon": 0,
    "resource": [
      "Teste"
    ],
    "uri": "testeUri",
    "protocol": "MQTT",
    "describe": "ExampleUpdated",
    "isDevice": true
  })

  expect(res.body).toBeFalsy()

  done()
})