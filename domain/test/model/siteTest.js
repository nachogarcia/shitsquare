var Site = require('../../src/model/Site.js');
var Review = require('../../src/model/Review.js');
var Coordinate = require('../../src/model/Coordinate.js');


describe('A Site', () => {
  it('registers a review', () => {
    let site = new Site({id: "A site", coordinate: new Coordinate(1,-1)});
    let review = new Review({id: "A review", time:"Some time"});

    site.addReview(review);

    expect(site.reviews).to.contain(review);
  });
});
