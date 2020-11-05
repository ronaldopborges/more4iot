const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test004' + '?retryWrites=true&w=majority'
const Data = require('../Model/data')

setupDB(databaseName)
const seedsData = [{
  "lat": 4,
  "lon": 0,
  "object": {
    "gps": 10,
  },
  "deviceUuid": "4545"
},
{
  "lat": 5,
  "lon": 0,
  "object": {
    "gps": 10,
  },
  "deviceUuid": "132"
},
{
  "lat": 5,
  "lon": 4,
  "object": {
    "gps": 10,
  },
  "deviceUuid": "132"
},
{
  "lat": 5,
  "lon": 0,
  "object": {
    "gps": 10,
  },
  "deviceUuid": "122"
}
]

it("Should successfully get all data from all devices.", async done => {
  for (const d of seedsData) {
    const seededData = new Data.db(d)
    await seededData.save()

  }

  const res = await request.get(`/datas`)

  expect(res.body).toBeTruthy();

  done()
})