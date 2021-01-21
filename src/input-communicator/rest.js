const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const addresses = require('./config/addresses');
const swaggerDocument = YAML.load('./yaml_3.0.yaml');

/**
 * Turns online a REST server, which will redirect all messages received to the global sender from index.js
 */
module.exports = () => {
    const server = express();

    server.use(
        `/${addresses.route_swagger_api}`,
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {customSiteTitle: "Input Communicator API"})
    );
    server.use(express.json());
    server.use(cors())
    server.use(routes);

    server.listen(addresses.inputCommunicatorRestPort, () => {
        console.log("[x] Rest online...");
    });
}