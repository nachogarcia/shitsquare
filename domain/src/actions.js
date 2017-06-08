var Site = require('./model/Site.js')
var Review = require('./model/Review.js')
var Validator = require('./model/Validator.js')

const validator = new Validator()

function RegisterASiteAction (siteRepository) {
  function run (siteData) {
    if (!validator.isValidSite(siteData)) {
      return Promise.reject(new Error('Invalid Site Data'))
    }

    siteData.id = siteRepository.nextSiteId()
    let site = new Site(siteData)
    return siteRepository.put(site).then(result => {
      return site
    })
  };

  return { run }
}

function RegisterAReviewAction (siteRepository, clock) {
  function run (reviewData, siteId) {
    if (!validator.isValidReview(reviewData)) {
      return Promise.reject(new Error('Invalid Review Data'))
    }

    reviewData.id = siteRepository.nextReviewId()
    reviewData.time = clock.now()
    let review = new Review(reviewData)

    return siteRepository.findById(siteId).then(site => {
      site.addReview(review)
      return siteRepository.put(site).then(result => {
        return review
      })
    })
  };

  return { run }
}

function GetClosestSitesAction (siteRepository) {
  const NUMBER_OF_SITES = 100

  function run (coordinate) {
    if (!validator.isValidCoordinate(coordinate)) {
      return Promise.reject(new Error('Invalid Coordinate'))
    }

    return siteRepository.getClosest(coordinate, NUMBER_OF_SITES)
  };

  return { run }
}

module.exports = {
  RegisterASiteAction,
  RegisterAReviewAction,
  GetClosestSitesAction
}
