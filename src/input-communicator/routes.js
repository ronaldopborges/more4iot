const express = require('express');
const routes = express.Router();

const config = require('@iotufersa/more4iot-js-sdk/config/routes');

routes.post(`/${config.inputCommunicatorRoute}`, async (req, res) => {
  sender(JSON.stringify(req.body));
  res.status(200).send("input device data [in process]");
});

module.exports = routes;