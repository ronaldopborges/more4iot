const ip = require('ip');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const server = require('./server');
const swaggerOptions = require('./swagger');
const { DATABASE_URL } = require('./config/mongo');
const { RESOURCE_MANAGER_PORT } = require('./config/resource');
const { RESOURCE_MANAGER_NAME, ROUTE_SWAGGER_API } = require('@iotufersa/more4iot-js-sdk/config/services');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);

server.use(
    `/${ROUTE_SWAGGER_API}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions, {customSiteTitle: "Resource Manager API"})
);

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

const sv = server.listen(RESOURCE_MANAGER_PORT || 0, () => {
    console.log(`Resource manager online... ${sv.address().port}`);
    rg.sendRegistry(RESOURCE_MANAGER_NAME, ip.address(), sv.address().port).then((res)=>{
        console.log(`service registry: ${res.data}`);
    })
    .catch((err)=>{
        console.log(`service registry: ${err.code}`);
    });
});