var rpc = require('json-rpc2');

var client = rpc.Client.$create(8000, 'localhost');

let siteData = {id: "A site", coordinate: {x: 1, y: 3}};
let currentLocation = {x: 0, y: 0};

client.call('registerASite', siteData);
client.call('getClosest', currentLocation, (err, sites) => {
  console.log(sites);
});

//client.call('RegisterAReview', "A Review", "A site");
