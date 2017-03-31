var rpc = require('json-rpc2');

var client = rpc.Client.$create(8000, 'localhost');

let siteData = {id: "A site", coordinate: {x: 1, y: 3}};
let currentLocation = {x: 0, y: 0};
let reviewData = {id: "A review"};

function main() {

  client.call('registerASite', siteData);

  client.call('getClosest', currentLocation, (err, closestSites) => {
    client.call('registerAReview', {reviewData: reviewData, siteData: closestSites[0]});
  });

setTimeout( () => {
  client.call('getClosest', currentLocation, (err, closestSites) => {
    console.log(closestSites);
  })}, 2000);

}

main();
