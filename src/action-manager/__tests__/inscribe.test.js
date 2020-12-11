const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test001' + '?retryWrites=true&w=majority'
const routeConfig = require('../config/routesConfig')

jest.setTimeout(30000);
setupDB(databaseName)

it("Should successfully store an action into database", async done => {
  const res = await request.post(`/${routeConfig.actionManagerRouteSave}`)
    .send({
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
    })

  expect(res.body._id).toBeTruthy()

  done()
})

it("Should refuse missing required param when trying to store an action", async done => {
  const res = await request.post(`/${routeConfig.actionManagerRouteSave}`)
  .send({
    "uuidSensor": "100p",
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
  })

  expect(res.body).toBe(false)

  done()
})

it("Should refuse no matching param type when trying to store an action", async done => {
  const res = await request.post(`/${routeConfig.actionManagerRouteSave}`)
  .send({
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
      "quant": "no match"
    },
    "status": true
  })

  expect(res.body).toBe(false)

  done()
})
