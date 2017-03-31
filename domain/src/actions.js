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

  constructor(reviewRepository, clock) {
    this.reviewRepository = reviewRepository;
    this.clock = clock;
  };

  run(reviewData, site) {
    let review = new Review(reviewData, this.clock.now());
    site.addReview(review);
    this.reviewRepository.put(review);
    return review;
  };
}

module.exports = {
  RegisterASiteAction,
  RegisterAReviewAction
}
