var faker = require('faker');

var Site = require('../model/Site.js');
var Review = require('../model/Review.js');
var Coordinate = require('../model/Coordinate.js');


class Migrator {

  constructor(factory){
    this.factory = factory;
    this.connection = factory.createDBConnection();
  }

  resetDB () {
    this.dropTables();
    this.createTables();
  }

  createTables () {
    Promise.all([this.connection.query('CREATE TABLE sites (id uuid CONSTRAINT pkey PRIMARY KEY, data jsonb)')]);
  }

  dropTables () {
    Promise.all([this.connection.query('DROP TABLE IF EXISTS sites')]);
  }

  poblateFake () {
    let registerASiteAction = this.factory.createRegisterASiteAction();
    let registerAReviewAction = this.factory.createRegisterAReviewAction();

    for(let i = 0; i < 100; i++){
      let siteData = {};
      siteData.name = faker.company.companyName();
      siteData.coordinate = this.fakeCoordinate();
      siteData.reviews = [];
      registerASiteAction.run(siteData).then( (site) => {
        for(let j = 0; j < 10; j++){
          let reviewData = {};
          reviewData.author = faker.name.findName();
          reviewData.score = this.fakeScore();
          reviewData.comment = faker.lorem.sentences();
          registerAReviewAction.run(reviewData, site.id);
        }
      });
    }
  }

  fakeScore(){
    return faker.random.number({
      'min': 0,
      'max': 5
    });
  }

  fakeCoordinate(){
    return new Coordinate(
      parseFloat(
        41.6 + "" +
        faker.random.number({
          'min': 100000,
          'max': 999999,
        })
      ),
      parseFloat(
        "-0." +
        faker.random.number({
          'min': 8000000,
          'max': 9999999,
        })
      )
    );
  }
}

module.exports = Migrator
