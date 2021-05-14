const ip = require('ip');
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

const server = require('./server.js');
const swaggerOptions = require('./swagger');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const { SERVICE_CATALOGER_NAME, ROUTE_SWAGGER_API } = require('@iotufersa/more4iot-js-sdk/config/services');
const {SERVICE_CATALOGER_PORT} = require('./config/serviceCataloger');

server.use(
    `/${ROUTE_SWAGGER_API}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions, {customSiteTitle: "Service Cataloger API"})
);

const sv = server.listen(SERVICE_CATALOGER_PORT || 0, () => {
    console.log(`Service Cataloger online... ${sv.address().port}`);
    rg.sendRegistry(SERVICE_CATALOGER_NAME, ip.address(), sv.address().port).then((res)=>{
        console.log(`service registry: ${res.data}`);
    })
    .catch((err)=>{
        console.log(`service registry: ${err.code}`);
    });;
});