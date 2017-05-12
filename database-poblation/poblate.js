var fs = require('fs');
var xml2js = require('xml2js');
var Factory = require('../domain/src/Factory.js')

var factory = new Factory();
var parser = new xml2js.Parser();
var registerASiteAction = factory.createRegisterASiteAction();

fs.readFile(__dirname + '/osmosis/sites.osm', (err, data) => {
  parser.parseString(data, (err, result) => {
    result.osm.node.forEach( raw => {
      let nameNode = raw.tag.find( raw => raw['$'].k === 'name');
      let lat = Number(raw['$'].lat);
      let lon = Number(raw['$'].lon);

      if (nameNode != undefined && lat != undefined && lon != undefined) {
        let siteData = {};
        siteData.name = nameNode['$'].v;
        siteData.coordinate = { x: lat, y: lon };

        registerASiteAction.run(siteData)
      }
    })
  });
});
