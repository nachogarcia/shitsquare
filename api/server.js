var Factory = require('../domain/src/Factory.js')
var express = require('express')
var bodyParser = require('body-parser')
var Dispatcher = require('./Dispatcher.js')
var JsonRPCParser = require('./JsonRPCParser.js')
var app = express()

let factory = new Factory();
let dispatcher = new Dispatcher();
let jsonRPCParser = new JsonRPCParser();

dispatcher.addMethod('getClosestSites',factory.createGetClosestSitesAction().run);
dispatcher.addMethod('registerASite',factory.createRegisterASiteAction().run);
dispatcher.addMethod('registerAReview',factory.createRegisterAReviewAction().run);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

let endpoint = process.env.API_ENDPOINT || '/';

app.post(endpoint,(req, res) => {
  let {method, id, params} = jsonRPCParser.unparse(req);

  dispatcher.run(method, ...params)
    .then( result => {
      return res.send(jsonRPCParser.parse(result, id));
    }).catch( error => {
      return res.send(jsonRPCParser.parse(error, id));
    });
});

let port = process.env.API_PORT || 8000;

app.listen(port, () => {
  console.log('shitsquare-api listening on port ' + port)
})
