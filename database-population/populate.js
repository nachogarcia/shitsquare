var fs = require('fs');
var sax = require('sax');
var fetch = require('node-fetch')

var stream = sax.createStream();

const FILE = process.argv[2]
const URL = process.argv[3]

let siteData = {};
let actions = 0;

let sendRegisterASite = (siteData) => {
  let method = 'registerASite'
  let id = '1'
  let params = {}
  params.siteData = siteData;

  let body = { method, params, id }

  return post(body)
}

let post = (body) => {
  let fetchData = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return fetch(URL, fetchData)
}

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
      sendRegisterASite(siteData).then( () => {
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
    console.log("Finished parsing")
});

readStream = fs.createReadStream(__dirname + FILE)
readStream.pipe(stream)
