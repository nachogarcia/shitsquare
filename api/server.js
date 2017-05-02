var Factory = require('../domain/src/Factory.js')
var express = require('express')
var bodyParser = require('body-parser')
var Dispatcher = require('./Dispatcher.js')
var JsonRPCParser = require('./JsonRPCParser.js')
var app = express()

var factory = new Factory();
var dispatcher = new Dispatcher();
dispatcher.addMethod('getClosestSites',factory.createGetClosestSitesAction());
dispatcher.addMethod('registerASite',factory.createRegisterASiteAction());
dispatcher.addMethod('registerAReview',factory.createRegisterAReviewAction());

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.post('/api',(req, res) => {
  let {method, id, params} = JsonRPCParser.unparse(req);

  dispatcher.run(method, ...params)
    .then( result => {
      return res.send(JsonRPCParser.parse(result, id));
    }).catch( error => {
      return res.send(JsonRPCParser.parse(error, id));
      console.log("error",error)
    });
});

app.listen(8000, () => {
  console.log('shitsquare-api listening on port 8000!')
})
