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
    return this.dropTables().then((result) => {
      return this.createTables();
    });
  }

  createTables () {
    return this.connection.query('CREATE TABLE sites (id uuid CONSTRAINT pkey PRIMARY KEY, data jsonb)');
  }

  dropTables () {
    return this.connection.query('DROP TABLE IF EXISTS sites');
  }

  poblateFake () {
    let siteCreations = [];
    for(let i = 0; i < 500; i++){
      siteCreations.push(this.createSite());
    }
    Promise.all(siteCreations);
  }

  createSite () {
    let registerASiteAction = this.factory.createRegisterASiteAction();
    let siteData = {};
    siteData.name = faker.company.companyName();
    siteData.coordinate = this.fakeCoordinate();

    return registerASiteAction.run(siteData).then( site => {
      let reviewCreations = [];
      for(let j = 0; j < 10; j++){
        reviewCreations.push(this.createReview(site.id));
      }
      Promise.all(reviewCreations);
    });
  }

  createReview (id) {
    let registerAReviewAction = this.factory.createRegisterAReviewAction();
    let reviewData = {};
    reviewData.author = faker.name.findName();
    reviewData.score = this.fakeScore();
    reviewData.comment = faker.lorem.sentences();
    return registerAReviewAction.run(reviewData, id);
  }

  fakeScore(){
    return faker.random.number({
      'min': 1,
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
