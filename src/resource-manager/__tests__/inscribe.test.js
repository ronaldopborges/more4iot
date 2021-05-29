const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test001' + '?retryWrites=true&w=majority'
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName);

it("Should successfully store a resource into database", async done => {
  const res = await request.post(`/${routeConfig.resourceManagerRouteSave}`)
    .send({
      "resource": [
        "Teste"
      ],
      "uri": "testeUri",
      "protocol": "MQTT",
      "describe": "Example",
      "isDevice": true
    })

  expect(res.body._id).toBeTruthy()

  done()
})

it("Should refuse missing required param when trying to store a resource", async done => {
  const res = await request.post(`/${routeConfig.resourceManagerRouteSave}`)
    .send({
      "lat": 0,
      "lon": 0,
      "resource": [
        "Teste"
      ],
      "uri": "testeUri",
      "describe": "Example",
      "typeDevice": "Sensor"
    })

  expect(res.body).toBe(false)

  done()
})

it("Should refuse no matching param type when trying to store a resource", async done => {
  const res = await request.post(`/${routeConfig.resourceManagerRouteSave}`)
    .send({
      "lat": 0,
      "lon": 0,
      "resource": [
        "Teste"
      ],
      "uri": "testeUri",
      "protocol": "MQTT",
      "describe": "Example",
      "isDevice": "No matching type"
    })

  expect(res.body).toBe(false)

  done()
})
