var Coordinate = require('./Coordinate.js');


class Site{
  constructor(siteData){
    this.id = siteData.id;
    this.coordinate = siteData.coordinate;
    this.name = siteData.name;
    this.reviews = siteData.reviews || [];
  }

  addReview(review){
    this.reviews.unshift(review);
  }

  static sortSites(currentCoordinate, sites) {
    sites.sort( (a, b) => {
      return Coordinate.compare(currentCoordinate, a.coordinate, b.coordinate);
    });
  }
}

module.exports = Site
