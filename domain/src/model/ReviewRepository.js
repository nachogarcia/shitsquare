class ReviewRepository{

  constructor() {
    this.reviews = [];
  };

  put(review) {
    this.reviews.push(review);
  };

  all(){
    return this.reviews;
  };
}

module.exports = ReviewRepository
