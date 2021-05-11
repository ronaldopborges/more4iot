const ip = require('ip');
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./yaml_3.0.yaml');

const routes = require('./routes');
const rg = require('./services/RegistryService');
const {INPUT_COMMUNICATOR_NAME, ROUTE_SWAGGER_API} = require('./config/more4iot');
const { INPUT_COMMUNICATOR_PORT } = require('./config/inputCommunicator');

/**
 * Turns online a REST server, which will redirect all messages received to the global sender from index.js
 */
module.exports = async () => {
    const server = express();

    server.use(
        `/${ROUTE_SWAGGER_API}`,
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {customSiteTitle: "Input Communicator API"})
    );
    server.use(express.json());
    server.use(cors())
    server.use(routes);

    const sv = server.listen(INPUT_COMMUNICATOR_PORT || 0, () => {
        console.log(`[x] Rest online... ${sv.address().port}`);
        rg.sendRegistry(INPUT_COMMUNICATOR_NAME, ip.address(), sv.address().port);
    });
}