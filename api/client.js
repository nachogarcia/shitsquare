var rpc = require('json-rpc2');

var client = rpc.Client.$create(8000, 'localhost');

client.call('add', [1, 2], function(err, result) {
    console.log('1 + 2 = ' + result);
});
