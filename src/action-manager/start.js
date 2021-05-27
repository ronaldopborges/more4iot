const ip = require('ip');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const swaggerUi = require('swagger-ui-express');

const { DATABASE_URL } = require('./config/mongo');
const { ACTION_MANAGER_PORT } = require('./config/actionManager');
const config = require('@iotufersa/more4iot-js-sdk/config/routes');
const mqttReceiver = require('./services/mqtt_receiver');
const server = require('./server');
const swaggerOptions = require('./swagger');
const { SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT } = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const {ACTION_MANAGER_NAME, ROUTE_SWAGGER_API } = require('@iotufersa/more4iot-js-sdk/config/services');
const debug = require('debug')('action:main')

server.use(
    `/${ROUTE_SWAGGER_API}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions, {customSiteTitle: "Action Manager API"})
);

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

const sv = server.listen(ACTION_MANAGER_PORT || 0, () => {
    debug(`Action manager online... ${sv.address().port}`);
    rg.sendRegistry(ACTION_MANAGER_NAME, ip.address(), sv.address().port).then((res)=>{
        debug(`service registry: ${res.data}`);
    })
    .catch((err)=>{
        debug(`service registry: ${err.code}`);
    });;
});

mqttReceiver(config.async_data);
