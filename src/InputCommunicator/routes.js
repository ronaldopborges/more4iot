const express = require('express');
const config = require('./config/routesConfig');

const routes = express.Router();

 routes.post(`/${config.inputCommunicatorRoute}`,(req, res) => {
   sender(JSON.stringify(req.body)); 
    res.json({message: "Msg recebida."})
 });

 module.exports = routes;