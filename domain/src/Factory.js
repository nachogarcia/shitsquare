var SiteRepository = require('./SiteRepository.js');
var Clock = require('./Clock.js');
var actions = require('../actions.js');


class Factory {

  createClock() {
    this.clock = this.clock || new Clock();
    return this.clock;
  }

  createSiteRepository() {
    this.siteRepository = this.siteRepository || new SiteRepository();
    return this.siteRepository;
  }

  createReviewRepository() {
    this.reviewRepository = this.reviewRepository || new ReviewRepository();
    return this.reviewRepository;
  }

  createRegisterAReviewAction() {
    this.registerAReviewAction = this.registerAReviewAction || new actions.RegisterAReviewAction( this.createReviewRepository(), this.createClock() );
    return this.registerAReviewAction;
  }

  createRegisterASiteAction() {
    this.registerASiteAction = this.registerASiteAction || new actions.RegisterASiteAction( this.createSiteRepository() );
    return this.registerASiteAction;
  }
}

module.exports = Factory
