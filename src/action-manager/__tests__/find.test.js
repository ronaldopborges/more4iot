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
  "uuidSensor": "100p",
  "uuidAtuador": "100p",
  "dataSensor": {
    "liveLat": -45.50,
    "liveLon": -3.50
  },
  "dataAtuador": {
    "liveLat": -45.50,
    "liveLon": -3.50
  },
  "lifetimeAtuacao": {
    "lifetime": true,
    "quant": 10
  },
  "status": true
}

const seedAction2 = {
  "uuidSensor": "200p",
  "uuidAtuador": "200p",
  "dataSensor": {
    "liveLat": -45.50,
    "liveLon": -3.50
  },
  "dataAtuador": {
    "liveLat": -45.50,
    "liveLon": -3.50
  },
  "lifetimeAtuacao": {
    "lifetime": true,
    "quant": 10
  },
  "status": true
}

it("Should return all actions of a specific sensor uuid", async done => {
  const seededAction = new Action.db(seedAction)
  await seededAction.save()

  const res = await request.get(`/${routeConfig.actionManagerRouteGetActionsByUuid}/100p`)

  expect(res.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({uuidSensor: '100p'})
    ])
  )

  done()
})

it("Should return false when trying to search for nonexistent action", async done => {
  const seededAction2 = new Action.db(seedAction2)
  await seededAction2.save()

  const res2 = await request.get(`/${routeConfig.actionManagerRouteGetActionsByUuid}/010`)

  expect(res2.body).toBeFalsy()

  done()
})

