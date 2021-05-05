const ip = require('ip');
const dotenv = require('dotenv').config();

const swaggerUi = require('swagger-ui-express');

const addresses = require('./config/addresses');
const server = require('./server.js');
const swaggerOptions = require('./swagger');

const rg = require('./services/RegistryService');
const { SERVICE_CATALOGER_NAME, ROUTE_SWAGGER_API } = require('./config/more4iot');

server.use(
    `/${ROUTE_SWAGGER_API}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions, {customSiteTitle: "Service Cataloger API"})
);

server.listen(addresses.serviceCatalogerPort, () => {
    console.log(`Service Cataloger online... ${sv.address().port}`);
    rg.sendRegistry(SERVICE_CATALOGER_NAME, ip.address(), sv.address().port);
});