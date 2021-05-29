const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test003' + '?retryWrites=true&w=majority'
const Resource = require('../model/Resource');
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName);

const seed01 = {
  "uuid": "007",
  "uri": "testeUri",
  "protocol": "mqtt",
  "isDevice": true
}

it("Should successfully delete a resource from database", async done => {
  const seeded = new Resource.db(seed01);
  await seeded.save()

  const res = await request.delete(`/${routeConfig.resourceManagerRouteDelete}/007`)

  expect(res.body).toBe(true)

  done()
})

it("Should refuse to delete a nonexistent resource from database", async done => {
  const res = await request.delete(`/${routeConfig.resourceManagerRouteDelete}/015`)

  expect(res.body).toBeFalsy()

  done()
})