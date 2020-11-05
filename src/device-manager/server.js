const express   = require('express');
const routes    = require('./routes');
const cors      = require('cors');
const server    = express();
server.use(express.json());
server.use(cors());
server.use(routes);
server.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions)
);

module.exports  = server
