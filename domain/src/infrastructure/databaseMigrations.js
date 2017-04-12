var faker = require('faker');

var Factory = require('../Factory.js');
var Site = require('../model/Site.js');
var Review = require('../model/Review.js');
var Coordinate = require('../model/Coordinate.js');

let factory = new Factory();
let connection = factory.createDBConnection();

init();
//reset();

function createTables () {
  connection.query('CREATE TABLE sites (id uuid CONSTRAINT pkey PRIMARY KEY, data jsonb)');
}

function poblateFake () {
  let registerASiteAction = factory.createRegisterASiteAction();
  let registerAReviewAction = factory.createRegisterAReviewAction();

  for(let i = 0; i < 100; i++){
    siteData = {};
    siteData.name = faker.company.companyName();
    siteData.coordinate = fakeCoordinate();
    siteData.reviews = [];
    let site = registerASiteAction.run(siteData);
    /*
    for(let j = 0; j < 10; j++){
      let reviewData = {};
      reviewData.author = faker.name.findName();
      reviewData.score = fakeScore();
      registerAReviewAction.run(reviewData, site.id);
    }
    */
    console.log(site);
  }
}

function fakeScore(){
  return faker.random.number({
    'min': 0,
    'max': 5
  });
}

function fakeCoordinate(){
  return new Coordinate(41.6 + "" +
    faker.random.number({
      'min': 0,
      'max': 9
    }),0.7 + "" +
    faker.random.number({
      'min': 0,
      'max': 9
    }));
}

function init () {
  createTables();
  poblateFake();
}

function reset () {
  connection.query('DROP TABLE sites');
}
