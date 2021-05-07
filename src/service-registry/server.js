require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const swaggerOptions = require('./swagger');
const { ROUTE_SWAGGER_API } = require('@iotufersa/more4iot-js-sdk/config/services');
const { SERVICE_REGISTRY_PORT } = require('./config/registry');

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

server.use(
  `/${ROUTE_SWAGGER_API}`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions, {customSiteTitle: "Service Registry API"})
);

const sv = server.listen(SERVICE_REGISTRY_PORT || 0, () => {
  console.log(`Service registry online... ${sv.address().port}`)
});