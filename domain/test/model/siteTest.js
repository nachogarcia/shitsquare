var sites = require('../../src/model/Site.js');


describe('A Site', () => {
  it('registers a review', () => {
    let site = new sites.Site("A site");
    let review = {content:"A review"};

    site.addReview(review);

    expect(site.reviews).to.contain(review);
  });
});
