const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test004' + '?retryWrites=true&w=majority'
const Resource = require('../model/Resource')
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName);

const seed01 = [{
  "uuid": "007",
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "isDevice": true
}, {
  "uuid": "006",
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "inDevice": true
}, {
  "uuid": "008",
  "resource": [
    "Teste"
  ],
  "uri": "testeUri",
  "protocol": "MQTT",
  "describe": "Example",
  "isDevice": true
},
]
it("Should return all resources stored in database", async done => {
  for (const d of seed01) {
    const seeded = new Resource.db(d)
    await seeded.save()
  }

  const res = await request.get(`/${routeConfig.resourceManagerRouteGetAll}`)

  expect(res.body[0].describe).toBeTruthy()

  done()
})