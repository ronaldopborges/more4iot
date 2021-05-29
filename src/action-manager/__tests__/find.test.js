const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test002' + '?retryWrites=true&w=majority'
const Action = require('../model/Action')
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName)

const seedAction = {
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
}

const seedAction2 = {
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
}

it("Should return all actions of a specific creator", async done => {
  const seeded = new Action.db(seedAction)
  await seeded.save()

  const res = await request.get(`/${routeConfig.actionManagerRouteGetActionsByUuid}/100p`)

  expect(res.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({creator: '100p'})
    ])
  )

  done()
})

it("Should return false when trying to search for nonexistent action", async done => {
  const seededAction2 = new Action.db(seedAction2)
  await seededAction2.save()

  const res2 = await request.get(`/${routeConfig.actionManagerRouteGetActionsByUuid}/010`)

  expect(res2.body).toMatchObject({})

  done()
})

