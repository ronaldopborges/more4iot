const ip = require('ip');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const addresses = require('./config/addresses');
const server = require('./server.js');
const { DATABASE_URL } = require('./config/env');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const rg = require('./services/RegistryService');
const {DATA_MANAGER_NAME, ROUTE_SWAGGER_API} = require('./config/more4iot');

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

server.listen(addresses.dataManagerPort, () => {
    console.log(`Data manager online... ${sv.address().port}`)
    rg.sendRegistry(DATA_MANAGER_NAME, ip.address(), sv.address().port);
});