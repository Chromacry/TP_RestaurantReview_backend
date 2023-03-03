require('dotenv').config();
const express = require('express');
const cors = require('cors');
const backend_routes = require('./src/services/backend_routes.js');

const backendPort = process.env.SERVERPORT || 8000;
const backend_app = express();

// Allow other server to communicate with backend server
const corsOptions = {
    exposedHeaders: 'AccessToken',
};
backend_app.use(cors(corsOptions));

// * Backend
backend_app.use(express.json({
    limit: '20mb'
}));

backend_app.use('/api', backend_routes);

// * Server Status
backend_app.listen(backendPort , ()=> console.log('> Backend Server is up and running on port : ' + backendPort))