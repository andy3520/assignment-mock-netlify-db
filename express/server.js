'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const db = require('../db.json')
const cors = require('cors')
const router = express.Router();

app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", CLIENT_ORIGIN);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", true); <--- this is the only different line I added.
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

router.get('/top-company', (req, res) => {
  res.json(db['top-company'])
})

router.get('/company', (req, res) => {
  res.json(db['company'])
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
