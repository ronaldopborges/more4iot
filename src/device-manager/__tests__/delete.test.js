const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test003' + '?retryWrites=true&w=majority'
const Device = require('../Model/device')

setupDB(databaseName)
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

it("Should successfully delete a device from database", async done => {
  const seededDevice = new Device.db(seedDevice)
  await seededDevice.save()

  const res = await request.delete(`/devices/delete/007`)

  expect(res.body).toBe(true)

  done()
})

it("Should refuse to delete a nonexistent device from database", async done => {
  const res = await request.delete(`/devices/delete/015`)

  expect(res.body).toBeFalsy()

  done()
})