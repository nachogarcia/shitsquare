class Review{
  constructor(reviewData){
    this.id = reviewData.id;
    this.time = reviewData.time;
    this.author = reviewData.author;
    this.score = reviewData.score;
    this.comment = reviewData.comment;
  }
}

module.exports = Review
