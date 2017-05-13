var faker = require('faker');

var Site = require('../model/Site.js');
var Review = require('../model/Review.js');
var Coordinate = require('../model/Coordinate.js');


class Migrator {

  constructor(connection, registerASiteAction, registerAReviewAction){
    this.connection = connection;
    this.registerASiteAction = registerASiteAction;
    this.registerAReviewAction = registerAReviewAction;
  }

  close () {
    return this.connection.end()
  }

  resetDB () {
    return this.dropTables().then(() => {
      return this.createTables()
    }).then(() => {
      return this.createIndex()
    });
  }

  createTables () {
    return this.connection.query('CREATE TABLE sites (id uuid CONSTRAINT pkey PRIMARY KEY, data jsonb)');
  }

  createIndex () {
    return this.connection.query("CREATE INDEX coordinate_index ON sites USING GIST (\
      st_setsrid(st_makepoint((data -> 'coordinate' -> 'x')::text::double precision,\
      (data -> 'coordinate' -> 'y')::text::double precision),4326))");
  }

  dropTables () {
    return this.connection.query('DROP TABLE IF EXISTS sites');
  }

  poblateFake () {
    let promise = this.createSite();
    for(let i = 0; i < 500; i++){
      promise = promise.then( () => { return this.createSite() });
    }
    return promise;
  }

  createSite () {
    let siteData = {};
    siteData.name = faker.company.companyName();
    siteData.coordinate = this.fakeCoordinate();

    return this.registerASiteAction.run(siteData).then( site => {
      let promise = this.createReview(site.id);
      for(let j = 0; j < this.numberOfReviews(); j++){
        promise = promise.then( () => { return this.createReview(site.id) });
      }
      return promise;
    });
  }

  createReview (id) {
    let reviewData = {};
    reviewData.author = faker.name.findName();
    reviewData.score = this.fakeScore();
    reviewData.comment = faker.lorem.sentences();
    return this.registerAReviewAction.run(reviewData, id);
  }

  numberOfReviews () {
    return faker.random.number({
      'min': 0,
      'max': 15
    });
  }

  fakeScore (){
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
