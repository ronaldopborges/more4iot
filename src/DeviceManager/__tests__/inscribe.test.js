const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test001' + '?retryWrites=true&w=majority'

setupDB(databaseName)

it("Should successfully store a device into database", async done => {
  const res = await request.post('/devices/inscribe')
    .send({
      "lat": 0,
      "lon": 0,
      "resource": [
        "Teste"
      ],
      "timeToGenerateData": 0,
      "uri": "testeUri",
      "protocol": "MQTT",
      "describe": "Example",
      "typeDevice": "Sensor"
    })

  expect(res.body).toBe(true)

  done()
})

it("Should refuse missing required param when trying to store a device", async done => {
  const res = await request.post('/devices/inscribe')
    .send({
      "lat": 0,
      "lon": 0,
      "resource": [
        "Teste"
      ],
      "timeToGenerateData": 0,
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
      "lat": 0,
      "lon": 0,
      "resource": [
        "Teste"
      ],
      "timeToGenerateData": "NO MATCHING PARAM TYPE",
      "uri": "testeUri",
      "protocol": "MQTT",
      "describe": "Example",
      "typeDevice": "Sensor"
    })

  expect(res.body).toBe(false)

  done()
})
