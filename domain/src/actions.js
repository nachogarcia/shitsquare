var Site = require('./model/Site.js');
var Review = require('./model/Review.js');

class RegisterASiteAction{

  constructor(siteRepository) {
    this.siteRepository = siteRepository;
  };

  run(siteData) {
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
    let numberOfSites = 50;
    return this.siteRepository.getClosest(coordinate, numberOfSites);
  };
}

module.exports = {
  RegisterASiteAction,
  RegisterAReviewAction,
  GetClosestSitesAction,
}
