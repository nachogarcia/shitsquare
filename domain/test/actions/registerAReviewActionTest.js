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
    reviewData = {id: "An id", time: time};
    site = new Site({id: "An id", coordinate: new Coordinate(0,0)});

    siteRepository = {put: () => {}, findById: () => {return site;}};
    sinon.spy(siteRepository, 'put');

    let clock = {now: () => {}};
    sinon.stub(clock,"now").callsFake( () => {
      return time;
    });

    registerAReviewAction = new actions.RegisterAReviewAction(siteRepository, clock);

    review = registerAReviewAction.run(reviewData, site.id);
  });

  it('adds the review to the repository', () => {
    expect(siteRepository.put).to.have.been.calledWith(site);
  });

  it('adds the review to the site', () => {
    expect(site.reviews).to.contain(review);
  });

  it('registers the review with the current time', () => {
    expect(review.time).to.equal(time);
  });
});
