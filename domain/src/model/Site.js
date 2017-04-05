var Coordinate = require('./Coordinate.js');


class Site{
  constructor(siteData){
    this.id = siteData.id;
    this.coordinate = siteData.coordinate;
    this.name = siteData.name;
    this.reviews = [];
  }

  addReview(review){
    this.reviews.push(review);
  }

  static sortSites(currentCoordinate, sites) {
    sites.sort( (a, b) => {
      return Coordinate.compare(currentCoordinate, a.coordinate, b.coordinate);
    });
  }
}

module.exports = Site
