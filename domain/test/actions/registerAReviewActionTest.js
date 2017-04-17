var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');
var Review = require('../../src/model/Review.js');

describe('Register a Review Action', () => {
  let reviewRepository;
  let site;
  let reviewData;
  let registerAReviewAction;
  let time;
  let review;

  beforeEach( () => {
    time = "An irrelevant time";

    siteRepository = {put: () => {}, findById: () => Promise.resolve(site), nextSiteId: () => 'id', nextReviewId: () => 'reviewId'};
    sinon.spy(siteRepository, 'put');

    site = new Site({id: siteRepository.nextSiteId(), name: "a name", coordinate: new Coordinate(0,0)});
    reviewData = {id: siteRepository.nextReviewId(), score: 5, time: time};

    let clock = {now: () => {}};
    sinon.stub(clock,"now").callsFake( () => {
      return time;
    });

    registerAReviewAction = new actions.RegisterAReviewAction(siteRepository, clock);

  });

  it('adds the review to the repository', () => {
    return registerAReviewAction.run(reviewData, site.id).then( (review) => {
      expect(siteRepository.put).to.have.been.calledWith(site);
    });
  });

  it('adds the review to the site', () => {
    return registerAReviewAction.run(reviewData, site.id).then( (review) => {
      expect(site.reviews).to.contain(review);
    });
  });

  it('registers the review with the current time', () => {
    return registerAReviewAction.run(reviewData, site.id).then( (review) => {
      expect(review.time).to.equal(time);
    });
  });
});
