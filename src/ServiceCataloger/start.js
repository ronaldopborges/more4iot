const addresses = require('./config/addresses');
const server    = require('./server.js');

server.listen(addresses.serviceCatalogerPort, () => {
    console.log("Service Cataloger online...")
});