const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { DATABASE_URL, SERVICE_PORT } = require('./config/env');
const routes = require('./routes');

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

server.listen(SERVICE_PORT, () => {
    console.log("Data manager online...")
});