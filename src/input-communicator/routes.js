const express = require('express');
const routes = express.Router();

const config = require('@iotufersa/more4iot-js-sdk/config/routes');

routes.post(`/${config.inputCommunicatorRoute}`, async (req, res) => {
  const response = await sender(JSON.stringify(req.body));
  if (typeof response === 'object' && response !== null) {
    res.json(response)
  }
  res.send(response)
});

module.exports = routes;