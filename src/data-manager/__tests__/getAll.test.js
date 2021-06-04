const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test004' + '?retryWrites=true&w=majority'
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
  "uuid": "4545"
},
{
  "lat": 5,
  "lon": 0,
  "data": {
    "gps": 10,
  },
  "uuid": "132"
},
{
  "lat": 5,
  "lon": 4,
  "data": {
    "gps": 10,
  },
  "uuid": "132"
},
{
  "lat": 5,
  "lon": 0,
  "data": {
    "gps": 10,
  },
  "uuid": "122"
}
]

it("Should successfully get all data from all devices.", async done => {
  for (const d of seedsData) {
    const seededData = new Data.db(d)
    await seededData.save()

  }

  const res = await request.get(`/${routeConfig.dataManagerRouteGetAll}`)

  expect(res.body).toBeTruthy();

  done()
})