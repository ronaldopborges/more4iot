const mongoose = require('mongoose');
const addresses = require('./config/addresses');
const { DATABASE_URL } = require('./config/env');
const server = require('./server.js');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');

server.use(
    `/${addresses.route_swagger_api}`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerOptions)
);

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

server.listen(addresses.deviceManagerPort, () => {
    console.log("Device manager online...")
});