require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const addresses = require('./config/addresses');

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

server.use(
  `/${addresses.route_swagger_api}`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions, {customSiteTitle: "Service Registry API"})
);

server.listen(addresses.serviceRegistryPort, () => {
  console.log("Service registry online...")
});
