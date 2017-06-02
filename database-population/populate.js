var fs = require('fs');
var sax = require('sax');
var Factory = require('../domain/src/Factory.js')

var stream = sax.createStream();
var factory = new Factory();
var connection = factory.createDBConnection();
var registerASiteAction = factory.createRegisterASiteAction();

const FILE = process.argv[2]

let siteData = {};
let actions = 0;

stream.on("opentag", node => {
  if (node.attributes) {
    if(node.attributes.LAT) {
      siteData.coordinate = {
        x: Number(node.attributes.LAT),
        y: Number(node.attributes.LON)
      }
    }

    if (node.attributes.K == 'name') {
      siteData.name = node.attributes.V
      actions++;
      readStream.pause()
      registerASiteAction.run(siteData).then( (site) => {
        if(actions <= 1){
          readStream.resume()
        }
        actions--;
      });
      siteData = {};
    }
  }
});

stream.on("end", () => {
  console.log("Finished parsing");
  setTimeout( () => {
    console.log("Finished populating");
    connection.end();
  }, 5000);
});

readStream = fs.createReadStream(__dirname + FILE)
readStream.pipe(stream)
