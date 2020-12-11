const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test002' + '?retryWrites=true&w=majority'
const Data = require('../model/Data')
const routeConfig = require('../config/routesConfig')

jest.setTimeout(30000);
setupDB(databaseName);

const seedData = {
  "lat": 0,
  "lon": 0,
  "object": {
    "gps": 10,
  },
  "deviceUuid": "17a69100-1451-11ea-a85a-bbc0ff709da3"
}
const seedData2 = {
  "lat": 0,
  "lon": 0,
  "object": {
    "gps": 10,
  },
  "deviceUuid": "17a69100-1451-11ea-a85a-bbc0ff709da3"
}

it("Should return all data from a specific device", async done => {
  const seededData = new Data.db(seedData)
  await seededData.save()

  const res = await request.get(`/${routeConfig.dataManagerRouteGetAll}/${seedData.deviceUuid}`)

  expect(res.body).toBeTruthy()

  done()
})

it("Should return false when trying to search all data for nonexistent device", async done => {
  const seededData2 = new Data.db(seedData2)
  await seededData2.save()

  const res = await request.get(`/${routeConfig.dataManagerRouteGetAll}/wrongUuid`)

  expect(res.body).toBeFalsy()

  done()
})

it("Should return LAST data stored for a specic device", async done => {
  const seededData2 = new Data.db(seedData2)
  await seededData2.save()

  const res = await request.get(`/${routeConfig.dataManagerRouteGetLastByUuid}/${seedData2.deviceUuid}`)

  expect(res.body).toBeTruthy()

  done()
})

it("Should return false when trying to get LAST stored data for nonexistent device", async done => {
  const seededData2 = new Data.db(seedData2)
  await seededData2.save()

  const re = await request.get(`/${routeConfig.dataManagerRouteGetLastByUuid}/wrongUuid`)

  expect(re.body).toBeFalsy()

  done()
})

