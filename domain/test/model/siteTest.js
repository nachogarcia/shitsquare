var Site = require('../../src/model/Site.js');
var Review = require('../../src/model/Review.js');
var Coordinate = require('../../src/model/Coordinate.js');


describe('A Site', () => {
  it('registers a review', () => {
    let site = new Site({id: "A site", coordinate: new Coordinate(1,-1)});
    let review = new Review("A review");

    site.addReview(review);

    expect(site.reviews).to.contain(review);
  });


  it('can be ordered by coordinates', () => {
    let currentCoord = new Coordinate(0,0);
    let closestSite = new Site({id: "A site", coordinate: new Coordinate(1,-1)});
    let middleSite = new Site({id: "A site", coordinate: new Coordinate(30,-10)});
    let farthestSite = new Site({id: "A site", coordinate: new Coordinate(50,-80)});
    let allSites = [middleSite, farthestSite, closestSite];

    Site.sortSites(currentCoord, allSites);

    expect(allSites[0]).to.eq(closestSite);
    expect(allSites[1]).to.eq(middleSite);
    expect(allSites[2]).to.eq(farthestSite);
  });
});
