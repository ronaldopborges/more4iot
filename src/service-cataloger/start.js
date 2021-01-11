const swaggerUi = require('swagger-ui-express');

const addresses = require('./config/addresses');
const server = require('./server.js');
const swaggerOptions = require('./swagger');

server.use(
    `/${addresses.route_swagger_api}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions, {customSiteTitle: "Service Cataloger API"})
);

server.listen(addresses.serviceCatalogerPort, () => {
    console.log("Service Cataloger online...")
});