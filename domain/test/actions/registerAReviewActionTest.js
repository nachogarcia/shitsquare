var actions = require('../../src/actions.js');
var sites = require('../../src/model/Site.js');

describe('Register a Review Action', () => {
  let reviewRepository;
  let site;
  let reviewData;
  let registerAReviewAction;
  let time;
  let review;

  beforeEach( () => {
    reviewData = "An id";
    site = new sites.Site("An id");

    reviewRepository = {put: () => {}};
    sinon.spy(reviewRepository, 'put');

    time = "An irrelevant time";
    let clock = {now: () => {}};
    sinon.stub(clock,"now").callsFake( () => {
      return time;
    });

    registerAReviewAction = new actions.RegisterAReviewAction(reviewRepository, clock);

    review = registerAReviewAction.run(reviewData, site);
  });

  it('adds the review to the repository', () => {
    expect(reviewRepository.put).to.have.been.calledWith(review);
  });

  it('adds the review to the site', () => {
    expect(site.reviews).to.contain(review);
  });

  it('registers the review with the current time', () => {
    expect(review.time).to.equal(time);
  });
});
