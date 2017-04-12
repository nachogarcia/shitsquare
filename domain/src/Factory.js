var SiteRepository = require('./model/SiteRepository.js');
var Clock = require('./model/Clock.js');
var actions = require('./actions.js');


class Factory {

  createClock() {
    this.clock = this.clock || new Clock();
    return this.clock;
  }

  createSiteRepository() {
    this.siteRepository = this.siteRepository || new SiteRepository();
    return this.siteRepository;
  }

  createRegisterAReviewAction() {
    this.registerAReviewAction = this.registerAReviewAction || new actions.RegisterAReviewAction( this.createSiteRepository(), this.createClock() );
    return this.registerAReviewAction;
  }

  createRegisterASiteAction() {
    this.registerASiteAction = this.registerASiteAction || new actions.RegisterASiteAction( this.createSiteRepository() );
    return this.registerASiteAction;
  }

  createGetClosestSitesAction() {
    this.getClosestSitesAction = this.getClosestSitesAction || new actions.getClosestSitesAction( this.createSiteRepository() );
  }
}

module.exports = Factory
