const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test004' + '?retryWrites=true&w=majority'
const Action = require('../model/Action')
const routeConfig = require('../config/routesConfig')

jest.setTimeout(30000);
setupDB(databaseName)

const seedsAction = [{
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
}, {
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
},{
  "uuidSensor": "300p",
  "uuidAtuador": "300p",
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
},{
  "uuidSensor": "400p",
  "uuidAtuador": "400p",
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
},
]

it("Should return all actions from all sensors stored in database", async done => {
  for (const d of seedsAction) {
    const seededAction = new Action.db(d)
    await seededAction.save()
  }

  const res = await request.get(`/${routeConfig.actionManagerRouteGetAll}`)

  expect(res.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({uuidSensor: '100p'}),
      expect.objectContaining({uuidSensor: '200p'}),
      expect.objectContaining({uuidSensor: '300p'}),
      expect.objectContaining({uuidSensor: '400p'})
    ])
  )

  done()
})