require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const {ROUTE_SWAGGER_API} = require('./config/more4iot');
const {SERVICE_REGISTRY_PORT} = require('./config/registry');

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