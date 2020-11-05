const mongoose = require('mongoose');
const addresses = require('./config/addresses');
const server = require('./server.js');
const { DATABASE_URL } = require('./config/env');

mongoose.connect(DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

server.listen(addresses.dataManagerPort, () => {
    console.log("Data manager online...")
});