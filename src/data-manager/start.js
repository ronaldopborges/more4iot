const ip = require('ip');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const server = require('./server.js');
const swaggerOptions = require('./swagger');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const { DATA_MANAGER_NAME, ROUTE_SWAGGER_API } = require('@iotufersa/more4iot-js-sdk/config/services');
const { DATABASE_URL } = require('./config/mongo');
const { DATA_MANAGER_PORT } = require('./config/dataManager');

server.use(
    `/${ROUTE_SWAGGER_API}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions, {customSiteTitle: "Data Manager API"})
);

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

const sv = server.listen(DATA_MANAGER_PORT || 0, () => {
    console.log(`Data manager online... ${sv.address().port}`)
    rg.sendRegistry(DATA_MANAGER_NAME, ip.address(), sv.address().port).then((res)=>{
        console.log(`service registry: ${res.data}`);
    })
    .catch((err)=>{
        console.log(`service registry: ${err.code}`);
    });;
});