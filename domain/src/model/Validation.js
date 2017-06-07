class Validation {
  static isValidSite (siteData) {
    return typeof siteData === 'object' &&
      this.isValidCoordinate(siteData.coordinate) &&
      typeof siteData.name === 'string'
  };

  static isValidCoordinate (coordinate) {
    return typeof coordinate === 'object' &&
      typeof coordinate.x === 'number' &&
      typeof coordinate.y === 'number'
  };

  static isValidReview (reviewData) {
    return typeof reviewData === 'object' &&
      typeof reviewData.author === 'string' &&
      this.isValidScore(reviewData.score) &&
      typeof reviewData.comment === 'string'
  };

  static isValidScore (score) {
    return typeof score === 'number' &&
      score >= 1 &&
      score <= 5
  };
}

module.exports = Validation
