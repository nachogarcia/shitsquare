var Site = require('./model/Site.js');
var Review = require('./model/Review.js');

class RegisterASiteAction{

  constructor(siteRepository) {
    this.siteRepository = siteRepository;
  };

  run(siteData) {
    let site = new Site(siteData);
    this.siteRepository.put(site);
  };
}

class RegisterAReviewAction{

  constructor(siteRepository, clock) {
    this.siteRepository = siteRepository;
    this.clock = clock;
  };

  run(reviewData, site) {
    reviewData.time = this.clock.now();
    let review = new Review(reviewData);
    site.addReview(review);
    this.siteRepository.put(site);
    return review;
  };
}

module.exports = {
  RegisterASiteAction,
  RegisterAReviewAction
}
