var Factory = require('../domain/src/Factory.js')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var factory = new Factory()

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.post('/api', function (req, res) {
  console.log(req.body)
  let method = req.body.method
  let params = req.body.params
  let id = req.body.id
  let result = {}

  switch (method) {
    case 'registerASite':
      result = registerASite(params)
      break
    case 'getClosest':
      result = getClosest(params)
      break
    case 'registerAReview':
      result = registerAReview(params)
      break
  }

  let response = {
    body: {
      jsonrpc: "2.0",
      result: result,
      id: id
    }
  }
  console.log(response)
  res.send(response)
})

app.listen(8000, function () {
  console.log('shitsquare-api listening on port 8000!')
})


function registerASite(siteData) {
  let registerASiteAction = factory.createRegisterASiteAction();
  return registerASiteAction.run(siteData);
}

function getClosest(coord) {
  let siteRepository = factory.createSiteRepository();
  return siteRepository.getClosest(coord,10);
}

function registerAReview(params) {
  let reviewData = params.reviewData
  let siteData = params.siteData
  let registerAReviewAction = factory.createRegisterAReviewAction();
  return registerAReviewAction.run(args.reviewData, args.siteData.id);
}
