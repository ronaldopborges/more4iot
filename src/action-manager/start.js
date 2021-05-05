const ip = require('ip');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const addresses = require('./config/addresses');
const { DATABASE_URL } = require('./config/env');
const server = require('./server.js');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const rg = require('./services/RegistryService');
const {ACTION_MANAGER_NAME, ROUTE_SWAGGER_API } = require('./config/more4iot')

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

server.listen(addresses.actionManagerPort, () => {
    console.log(`Action manager online... ${sv.address().port}`);
    rg.sendRegistry(ACTION_MANAGER_NAME, ip.address(), sv.address().port);
});