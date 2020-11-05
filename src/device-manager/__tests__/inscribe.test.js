const { setupDB }   = require('./test-setup')
const server        = require('../server')
const supertest     = require('supertest')
const request       = supertest(server)
const databaseName  = 'test001' + '?retryWrites=true&w=majority'

jest.setTimeout(30000);
setupDB(databaseName)

it("Should successfully store a device into database", async done => {
  const res = await request.post('/devices/inscribe')
    .send({
      "latDefault": 0,
      "lonDefault": 0,
      "resource": [
        "Teste"
      ],
      "uri": "testeUri",
      "protocol": "MQTT",
      "describe": "Example",
      "typeDevice": "Sensor"
    })

  expect(res.body._id).toBeTruthy()

  done()
})

it("Should refuse missing required param when trying to store a device", async done => {
  const res = await request.post('/devices/inscribe')
    .send({
      "latDefault": 0,
      "lonDefault": 0,
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

it("Should refuse no matching param type when trying to store a device", async done => {
  const res = await request.post('/devices/inscribe')
    .send({
      "lat": "no matching type",
      "lon": 0,
      "resource": [
        "Teste"
      ],
      "uri": "testeUri",
      "protocol": "MQTT",
      "describe": "Example",
      "typeDevice": "Sensor"
    })

  expect(res.body).toBe(false)

  done()
})
