const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const addresses = require('../config/addresses');

// O endereço do banco de dados mongoose com login/senha estara no arquivo ServiceDataBaseUrl.js  (git ignored)
const serverUri = require('../config/serviceDataBaseUrl');

const server = express();
mongoose.connect(serverUri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

server.use(express.json());
server.use(cors())
server.use(routes);

server.listen(addresses.actionManagerPort, () => {
    console.log("Action manager online...")
});