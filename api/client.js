var rpc = require('json-rpc2');

var client = rpc.Client.$create(8000, 'localhost');

client.call('RegisterASite', "A Site");

//client.call('RegisterAReview', "A Review", "A site");
