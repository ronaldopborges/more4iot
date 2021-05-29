const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test002' + '?retryWrites=true&w=majority'
const Resource = require('../model/Resource');
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName);

const seedDevice = {
  "uuid": "007",
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "mqtt",
  "isDevice": true
}
const seed02 = {
  "uuid": "008",
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "isDevice": true
}

it("Should return a specific searched resource", async done => {
  const seeded = new Resource.db(seedDevice)
  await seeded.save()

  const res = await request.get(`/${routeConfig.resourceManagerRouteFind}/007`)

  expect(res.body.uuid).toBe("007")

  done()
})

it("Should return empty object when trying to search for nonexistent resource", async done => {
  const seeded = new Resource.db(seed02)
  await seeded.save()

  const res2 = await request.get(`/${routeConfig.resourceManagerRouteFind}/010`)

  expect(res2.body).toStrictEqual({})

  done()
})

