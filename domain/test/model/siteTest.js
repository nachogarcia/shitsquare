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

  it('has the mean score of its reviews', () => {
    let site = new Site({id: "A site", coordinate: new Coordinate(1,-1)});
    let review1 = new Review({id: "A review", score: 0, time:"Some time"});
    let review2 = new Review({id: "A review", score: 5, time:"Some time"});
    let review3 = new Review({id: "A review", score: 3, time:"Some time"});
    let review4 = new Review({id: "A review", score: 4, time:"Some time"});

    site.addReview(review1);
    site.addReview(review2);
    site.addReview(review3);
    site.addReview(review4);

    expect(site.getScore()).to.eq(3)
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
