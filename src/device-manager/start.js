const ip = require('ip');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const { DATABASE_URL } = require('./config/mongo');
const { DEVICE_MANAGER_PORT } = require('./config/deviceManager');
const { DEVICE_MANAGER_NAME, ROUTE_SWAGGER_API } = require('./config/moreiot')
const server = require('./server.js');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const rg = require('./services/RegistryService');

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