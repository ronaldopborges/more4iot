const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test001' + '?retryWrites=true&w=majority'

setupDB(databaseName)

it("Testando se registra um Device no banco", async done => {
    const res  = await request.post('/devices/inscribe')
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