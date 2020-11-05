const express       = require('express');
const routes        = require('./routes');
const cors          = require('cors');
const addresses     = require('./config/addresses');
const server        = express();

server.use(express.json());
server.use(cors())
server.use(routes);

server.listen(SERVICE_PORT, () => {
    console.log("Action Communicator online...")
});