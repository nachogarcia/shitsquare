var Joi = require('joi')

const scoreSchema = Joi.number().integer().min(1).max(5).required()

const coordinateSchema = Joi.object().keys({
  x: Joi.number().required(),
  y: Joi.number().required()
})

const siteSchema = Joi.object().keys({
  coordinate: coordinateSchema,
  name: Joi.string().required()
})

const reviewSchema = Joi.object().keys({
  author: Joi.string().required(),
  score: scoreSchema,
  comment: Joi.string().required()
})

class Validation {
  isValidSite (siteData) {
    return !Joi.validate(siteData, siteSchema).error
  };

  isValidCoordinate (coordinate) {
    return !Joi.validate(coordinate, coordinateSchema).error
  };

  isValidReview (reviewData) {
    return !Joi.validate(reviewData, reviewSchema).error
  };

  isValidScore (score) {
    return !Joi.validate(score, scoreSchema).error
  };
}

module.exports = Validation
