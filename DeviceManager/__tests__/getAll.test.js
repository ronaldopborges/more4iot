const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test004' + '?retryWrites=true&w=majority'
const Device = require('../Model/device')

setupDB(databaseName)
const seedsDevice =[ {
  "uuid": "007",
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
},{
  "uuid": "006",
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
},{
  "uuid": "008",
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
},
]
it("Testando se busca um Device no banco pela api rest get", async done => {
  for (const d of seedsDevice){
    const seededDevice = new Device.db(d)
    await seededDevice.save()

  }

  const res = await request.get(`/devices`)

  expect(res.body[0].describe).toBeTruthy()

  done()
})