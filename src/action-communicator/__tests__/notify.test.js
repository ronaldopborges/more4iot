const server = require('../server')
const supertest = require('supertest')

const request = supertest(server);

const seed01 = {
  creator: "identifier01",
  receiver: {
    identifiers: ["identifier01"],
    protocol: "mqtt",
    uri: "identifier01"
  },
  scope: {
    data: {},
    commands: {}
  },
  lifetime: {
    validity: false,
    count: 0
  },
  status: true
}
describe("Received action", () => {
  jest.setTimeout(30000);
  it("Should to dispatch action for resources", async () => {
    return Promise.resolve().then(() => {
      return request.post(`/actionCommunicator/notify`).send(seed01).expect(200);
    }).then((res)=>console.log(res.text));
  });
});


