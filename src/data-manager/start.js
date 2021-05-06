const ip = require('ip');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./server.js');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const rg = require('./services/RegistryService');
const {DATA_MANAGER_NAME, ROUTE_SWAGGER_API} = require('./config/more4iot');
const { DATABASE_URL } = require('./config/mongo');
const {DATA_MANAGER_PORT} = require('./config/dataManager');

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
    rg.sendRegistry(DATA_MANAGER_NAME, ip.address(), sv.address().port);
});