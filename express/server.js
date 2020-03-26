'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db.json')
const cors = require('cors')


app.use(cors())
const router = express.Router();
router.get('/top-company', (req, res) => {
  res.json(db['top-company'])
})

router.get('/company',cors(), (req, res) => {
  res.json(db['company'])
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
