const express = require('express');
const cors = require('cors');
const router = require('./routes');
const morgan = require('morgan')

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))

//Every route with api
app.use('/', router);

module.exports = app;
