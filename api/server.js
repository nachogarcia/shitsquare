var Factory = require('../domain/src/Factory.js')
var express = require('express')
var bodyParser = require('body-parser')
var Dispatcher = require('./Dispatcher.js')
var app = express()

var factory = new Factory()
var dispatcher = new Dispatcher(factory)

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.post('/api',(req, res) => {
  console.log('Request', req.body);
  dispatcher.run(req,res);
  console.log('Response' res);
});

app.listen(8000, () => {
  console.log('shitsquare-api listening on port 8000!')
})
