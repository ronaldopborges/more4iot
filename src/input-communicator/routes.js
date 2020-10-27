const express = require('express');
const config = require('./config/routesConfig');

const routes = express.Router();

 routes.post(`/${config.inputCommunicatorRoute}`,async (req, res) => {
   const response = await sender(JSON.stringify(req.body));   
   if (typeof response === 'object' && response !== null){
    res.json(response)}
    res.send(response)
 });

 module.exports = routes;