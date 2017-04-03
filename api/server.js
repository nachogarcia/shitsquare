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
  let sites = siteRepository.getClosest(coord,10);
  callback(null, sites);
}

function registerAReview(args) {
  let registerAReviewAction = factory.createRegisterAReviewAction();
  registerAReviewAction.run(args.reviewData, args.siteData.id);
}

server.expose('registerASite', registerASite);
server.expose('getClosest', getClosest);
server.expose('registerAReview', registerAReview);

server.listen(8000, 'localhost');
