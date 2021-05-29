const { setupDB } = require('./test-setup')
const server = require('../server')
const supertest = require('supertest')
const request = supertest(server)
const databaseName = 'test003' + '?retryWrites=true&w=majority'
const Action = require('../model/Action')
const routeConfig = require('@iotufersa/more4iot-js-sdk/config/routes');

jest.setTimeout(30000);
setupDB(databaseName)

const seed01 = {
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

it("Should notifier action communicator for identifier", async done => {
  const seeded = new Action.db(seed01);
  await seeded.save()

  const res = await request.get(`/${routeConfig.actionManagerRouteNotifyActionCommunicator}/identifier01`)

  console.log(JSON.stringify(res.body));

  expect(res.body).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ "origin": ["identifier01"] })
    ])
  )

  done()
})

