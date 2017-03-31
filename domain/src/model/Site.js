var Coordinate = require('./Coordinate.js');


class Site{
  constructor(id,coordinate){
    this.id = id;
    this.coordinate = coordinate;
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
