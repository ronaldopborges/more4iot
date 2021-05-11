const ip = require('ip');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const server = require('./server');
const swaggerOptions = require('./swagger');
const { DATABASE_URL } = require('./config/mongo');
const { DEVICE_MANAGER_PORT } = require('./config/deviceManager');
const { DEVICE_MANAGER_NAME, ROUTE_SWAGGER_API } = require('@iotufersa/more4iot-js-sdk/config/services');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);

server.use(
    `/${ROUTE_SWAGGER_API}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions, {customSiteTitle: "Device Manager API"})
);

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

const sv = server.listen(DEVICE_MANAGER_PORT || 0, () => {
    console.log(`Device manager online... ${sv.address().port}`);
    rg.sendRegistry(DEVICE_MANAGER_NAME, ip.address(), sv.address().port);
});