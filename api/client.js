var rpc = require('json-rpc2');

var client = rpc.Client.$create(8000, 'localhost');

let siteData = {id: "A site", coordinate: {x: 1, y: 3}};
client.call('RegisterASite', siteData);

//client.call('RegisterAReview', "A Review", "A site");
