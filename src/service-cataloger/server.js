const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { SERVICE_PORT } = require('./config/env');

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(SERVICE_PORT, () => {
  console.log("Service Cataloger online...")
});