const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');
const { DATABASE_URL, SERVICE_PORT } = require('./config/env');
const swaggerOptions = require('./swagger');
const swaggerUi = require('swagger-ui-express');

const server = express();
server.use(express.json());
server.use(cors());
server.use(routes);
server.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions)
);

mongoose.connect(DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

server.listen(SERVICE_PORT, () => {
  console.log("Device manager online...")
});