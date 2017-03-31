var rpc = require('json-rpc2');
var Factory = require('../domain/src/Factory.js');

let factory = new Factory();

var server = rpc.Server.$create({
    'websocket': true,
    'headers': {
        'Access-Control-Allow-Origin': '*'
    }
});

function registerASite(siteData) {
  let registerASiteAction = factory.createRegisterASiteAction();
  registerASiteAction.run(siteData);
}

function getClosest(coord, opt, callback) {
  let siteRepository = factory.createSiteRepository();
  let sites = siteRepository.getClosest(coord);
  callback(null, sites);
}

function registerAReview(args) {
  let siteRepository = factory.createSiteRepository();
  let site = siteRepository.findById(args.siteData.id);
  console.log(site);
  let reviewData = args.reviewData;
  let registerAReviewAction = factory.createRegisterAReviewAction();
  registerAReviewAction.run(reviewData, site);
}

server.expose('registerASite', registerASite);
server.expose('getClosest', getClosest);
server.expose('registerAReview', registerAReview);

server.listen(8000, 'localhost');
