var sites = require('../../src/model/Site.js');
var coordinates = require('../../src/model/Coordinate.js');


describe('A Site', () => {
  it('registers a review', () => {
    let site = new sites.Site("A site", new coordinates.Coordinate(1,-1));
    let review = {content:"A review"};

    site.addReview(review);

    expect(site.reviews).to.contain(review);
  });


  it('can be ordered by coordinates', () => {
    let currentCoord = new coordinates.Coordinate(0,0);
    let closestSite = new sites.Site("A site", new coordinates.Coordinate(1,-1));
    let middleSite = new sites.Site("A site", new coordinates.Coordinate(30,-10));
    let farthestSite = new sites.Site("A site", new coordinates.Coordinate(50,-80));
    let allSites = [middleSite, farthestSite, closestSite];

    sites.Site.sortSites(currentCoord, allSites);

    expect(allSites[0]).to.eq(closestSite);
    expect(allSites[1]).to.eq(middleSite);
    expect(allSites[2]).to.eq(farthestSite);
  });
});
