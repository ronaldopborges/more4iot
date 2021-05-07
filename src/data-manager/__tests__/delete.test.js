const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test003' + '?retryWrites=true&w=majority'
const Data = require('../model/Data')
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName);

const seedsData = [{
  "lat": 4,
  "lon": 0,
  "data": {
    "gps": 10,
  },
  "deviceUuid": "2227dbe0-363b-11eb-88ae-1356f9478859"
},
{
  "lat": 5,
  "lon": 0,
  "data": {
    "gps": 10,
  },
  "deviceUuid": "2227dbe0-363b-11eb-88ae-1356f9478859"
}
]
jest.setTimeout(30000);

it("Should successfully delete all data from a specific device.", async done => {
  for (const d of seedsData) {
    const seededData = new Data.db(d)
    await seededData.save()

  }

  const res = await request.delete(`/${routeConfig.dataManagerRouteDelete}/2227dbe0-363b-11eb-88ae-1356f9478859`)

  expect(res.body).toBe(true)

  done()
})

it("Should refuse to delete all data from nonexistent device.", async done => {
  const res = await request.delete(`/${routeConfig.dataManagerRouteDelete}/wronguuid`)

  expect(res.body).toBeFalsy()

  done()
})