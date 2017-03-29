class Site{
  constructor(id){
    this.id = id;
    this.reviews = [];
  }

  addReview(review){
    this.reviews.push(review);
  }
}

module.exports = {
  Site
}
