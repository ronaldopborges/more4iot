const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test001' + '?retryWrites=true&w=majority'
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName)

it("Should successfully store an action into database", async done => {
  const res = await request.post(`/${routeConfig.actionManagerRouteSave}`)
    .send({
      creator: "identifier01",
      origin: ["identifier01"],
      receiver: {
        identifiers: [],
        protocol: null,
        uri: null
      },
      scope: {
        data: {},
        commands: {}
      },
      lifetime: {
        validity: true,
        count: 3
      },
      status: true
    })

  expect(res.body._id).toBeTruthy()

  done()
})

it("Should refuse missing required param when trying to store an action", async done => {
  const res = await request.post(`/${routeConfig.actionManagerRouteSave}`)
    .send({
      origin: ["identifier01"],
      receiver: {
        identifiers: [],
        protocol: null,
        uri: null
      },
      scope: {
        data: {},
        commands: {}
      },
      lifetime: {
        validity: true,
        count: 3
      },
      status: true
    })

  expect(res.body).toBe(false)

  done()
})

it("Should refuse no matching param type when trying to store an action", async done => {
  const res = await request.post(`/${routeConfig.actionManagerRouteSave}`)
    .send({
      creator: "identifier01",
      origin: ["identifier01"],
      receiver: {
        identifiers: [],
        protocol: null,
        uri: null
      },
      scope: {
        data: {},
        commands: {}
      },
      lifetime: {
        validity: true,
        count: "NO MATCHING"
      },
      status: true
    })

  expect(res.body).toBe(false)

  done()
})
