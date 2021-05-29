const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test004' + '?retryWrites=true&w=majority'
const Action = require('../model/Action')
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName)

const seedsAction = [{
  creator: "100p",
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
},{
  creator: "200p",
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
},{
  creator: "300p",
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
},{
  creator: "400p",
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
},
]

it("Should return all actions from all sensors stored in database", async done => {
  for (const d of seedsAction) {
    const seeded = new Action.db(d)
    await seeded.save()
  }

  const res = await request.get(`/${routeConfig.actionManagerRouteGetAll}`)

  expect(res.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({creator: '100p'}),
      expect.objectContaining({creator: '200p'}),
      expect.objectContaining({creator: '300p'}),
      expect.objectContaining({creator: '400p'})
    ])
  )

  done()
})