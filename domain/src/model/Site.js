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
}

module.exports = Site
