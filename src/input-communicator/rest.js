const express           = require('express');
const routes            = require('./routes');
const cors              = require('cors');
const swaggerUi         = require('swagger-ui-express');
const YAML              = require('yamljs');
const addresses         = require('./config/addresses');
const swaggerDocument   = YAML.load('./yaml_3.0.yaml');

/**
 * Turns online a REST server, which will redirect all messages received to the global sender from index.js
 */
module.exports = () => { 
const server    = express();

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use(express.json());
server.use(cors())
// utilizar as configurações que tão no routes.js
server.use(routes);

// ligando o servidor para ouvir a porta
server.listen(addresses.inputCommunicatorRestPort, () => {
    console.log("[x] Rest online.")
});
}