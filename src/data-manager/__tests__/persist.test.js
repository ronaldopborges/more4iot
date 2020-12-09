const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test001' + '?retryWrites=true&w=majority'

setupDB(databaseName)

it("Should successfully store data into database", async done => {
  const res = await request.post('/datas/persist')
    .send({
      "lat": 0,
      "lon": 0,
      "object": {
        "gps": 10,
      },
      "deviceUuid": "17a69100-1451-11ea-a85a-bbc0ff709da3"
    })

  expect(res.body).toBe(true)

  done()
})

it("Should refuse to store data when the uuid device isnt recognized in database", async done => {
  const res = await request.post('/datas/persist')
    .send({
      "lat": 0,
      "lon": 0,
      "object": {
        "gps": 10,
      },
      "deviceUuid": "wdsadasd"
    })

  expect(res.body).toBeFalsy()

  done()
})

it("Should refuse no matching param type when trying to persist data", async done => {
  const res = await request.post('/datas/persist')
    .send({
      "lat": 0,
      "lon": "NO MATCHING",
      "object": {
        "gps": 10,
      },
      "deviceUuid": "17a69100-1451-11ea-a85a-bbc0ff709da3"
    })

  expect(res.body).toBeFalsy()

  done()
})

it("Should refuse missing required param when trying to persist data", async done => {
  const res = await request.post('/datas/persist')
    .send({
      "lat": 0,
      "object": {
        "gps": 10,
      },
      "deviceUuid": "17a69100-1451-11ea-a85a-bbc0ff709da3"
    })

  expect(res.body).toBeFalsy()

  done()
})