var ReviewRepository = require('../../src/model/ReviewRepository.js');
var actions = require('../../src/actions.js');
var Review = require('../../src/model/Review.js');


describe('Site Repository', () => {
  let reviewRepository;

  beforeEach( () => {
   reviewRepository = new ReviewRepository()
  });

  it('Stores a site', () => {
    let review = new Review("A review");

    reviewRepository.put(review);

    let storedReview = reviewRepository.all()[0];
    expect(storedReview).to.equal(review);
  });

});
