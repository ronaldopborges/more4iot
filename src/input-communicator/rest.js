const ip = require('ip');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./yaml_3.0.yaml');
const routes = require('./routes');
const {SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT} = require('./config/registry');
const rg = require('@iotufersa/more4iot-js-sdk/registry')(SERVICE_REGISTRY_HOST, SERVICE_REGISTRY_PORT);
const {INPUT_COMMUNICATOR_NAME, ROUTE_SWAGGER_API} = require('@iotufersa/more4iot-js-sdk/config/services');
const { INPUT_COMMUNICATOR_PORT } = require('./config/inputCommunicator');
const debug = require('debug')('input:HTTP/REST')

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
        debug(`[*] Http server online on port: ${sv.address().port}`);
        rg.sendRegistry(INPUT_COMMUNICATOR_NAME, ip.address(), sv.address().port).then((res)=>{
            debug(`service registry: ${res.data}`);
        })
        .catch((err)=>{
            debug(`service registry error: ${err.code}`);
        });;
    });
}