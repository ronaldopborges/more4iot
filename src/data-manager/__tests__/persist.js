const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const routesConfig = require('@iotufersa/more4iot-js-sdk/config/routes');
const databaseName = 'test001' + '?retryWrites=true&w=majority'

jest.setTimeout(30000);
setupDB(databaseName);

it("Should successfully store data into database", async done => {
  const res = await request.post(`/${routesConfig.dataManagerRouteSave}`)
    .send({
      "lat": 0,
      "lon": 0,
      "data": {
        "gps": 10,
      },
      "deviceUuid": "2227dbe0-363b-11eb-88ae-1356f9478859"
    })

  expect(res.body).toBe(true)

  done()
})

it("Should refuse to store data when the uuid device isn't recognized in database", async done => {
  const res = await request.post(`/${routesConfig.dataManagerRouteSave}`)
    .send({
      "lat": 0,
      "lon": 0,
      "data": {
        "gps": 10,
      },
      "uuid": "wdsadasd"
    })

  expect(res.body).toBeFalsy()

  done()
})

it("Should refuse no matching param type when trying to persist data", async done => {
  const res = await request.post(`/${routesConfig.dataManagerRouteSave}`)
    .send({
      "lat": 0,
      "lon": "NO MATCHING",
      "data": {
        "gps": 10,
      },
      "uuid": "2227dbe0-363b-11eb-88ae-1356f9478859"
    })

  expect(res.body).toBeFalsy()

  done()
})

it("Should refuse missing required param when trying to persist data", async done => {
  const res = await request.post(`/${routesConfig.dataManagerRouteSave}`)
    .send({
      "lat": 0,
      "uuid": "2227dbe0-363b-11eb-88ae-1356f9478859"
    })

  expect(res.body).toBeFalsy()

  done()
})