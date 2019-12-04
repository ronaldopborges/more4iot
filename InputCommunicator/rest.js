const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const addresses = require('../config/addresses');

module.exports = () => { 
const server = express();

// para o express entender que vou usar json
server.use(express.json());
server.use(cors())
// utilizar as configurações que tão no routes.js
server.use(routes);

// ligando o servidor para ouvir a porta
server.listen(addresses.inputCommunicatorRestPort, () => {
    console.log("[x] Rest online.")
});
}