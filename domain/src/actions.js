var Site = require('./model/Site.js');
var Review = require('./model/Review.js');
var Validation = require('./model/Validation.js');

class RegisterASiteAction {

  constructor(siteRepository) {
    this.siteRepository = siteRepository;
  };

  run(siteData) {
    if ( !Validation.isValidSite(siteData) ){
      return Promise.reject(new Error("Invalid Site Data"));
    }

    siteData.id = this.siteRepository.nextSiteId();
    let site = new Site(siteData);
    return this.siteRepository.put(site).then( result => {
      return site;
    });
  };
}

class RegisterAReviewAction{

  constructor(siteRepository, clock) {
    this.siteRepository = siteRepository;
    this.clock = clock;
  };

  run(reviewData, siteId) {
    if( !Validation.isValidReview(reviewData) ) {
      return Promise.reject(new Error("Invalid Review Data"));
    }

    reviewData.id = this.siteRepository.nextReviewId();
    reviewData.time = this.clock.now();
    let review = new Review(reviewData);

    return this.siteRepository.findById(siteId).then( site => {
      site.addReview(review);
      return this.siteRepository.put(site).then( result => {
        return review;
      });
    });
  };
}

class GetClosestSitesAction {

  constructor (siteRepository) {
    this.siteRepository = siteRepository;
  };

  run (coordinate) {
    if( !Validation.isValidCoordinate(coordinate) ) {
      return Promise.reject(new Error("Invalid Coordinate"));
    }

    let numberOfSites = 50;
    return this.siteRepository.getClosest(coordinate, numberOfSites);
  };
}


module.exports = {
  RegisterASiteAction,
  RegisterAReviewAction,
  GetClosestSitesAction,
}
