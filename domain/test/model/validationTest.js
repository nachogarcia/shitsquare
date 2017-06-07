var Coordinate = require('../../src/model/Coordinate.js')
var Validation = require('../../src/model/Validation.js')

describe('Validation', () => {
  let siteData
  let reviewData

  describe('when validating a coordinate', () => {
    it('checks the type of x', () => {
      let coordinate = new Coordinate('a', 5)

      let result = Validation.isValidCoordinate(coordinate)

      expect(result).to.eq(false)
    })

    it('checks the type of y', () => {
      let coordinate = new Coordinate(-8, {})

      let result = Validation.isValidCoordinate(coordinate)

      expect(result).to.eq(false)
    })

    it('accepts a valid coordinate', () => {
      let coordinate = new Coordinate(-8, 5)

      let result = Validation.isValidCoordinate(coordinate)

      expect(result).to.eq(true)
    })
  })

  describe('when validating a site', () => {
    beforeEach(() => {
      siteData = {
        name: 'A site',
        coordinate: new Coordinate(0, 0)
      }
    })

    it('checks its coordinate', () => {
      siteData.coordinate = new Coordinate('a', 4)

      let result = Validation.isValidSite(siteData)

      expect(result).to.eq(false)
    })

    it('checks its name', () => {
      siteData.name = undefined

      let result = Validation.isValidSite(siteData)

      expect(result).to.eq(false)
    })

    it('accepts a valid site', () => {
      let result = Validation.isValidSite(siteData)

      expect(result).to.eq(true)
    })
  })

  describe('when validating a review', () => {
    beforeEach(() => {
      reviewData = {
        score: 5,
        author: 'An author',
        comment: 'A comment about the site'
      }
    })

    it('checks its author', () => {
      reviewData.author = undefined

      let result = Validation.isValidReview(reviewData)

      expect(result).to.eq(false)
    })

    it('checks its comment', () => {
      reviewData.comment = undefined

      let result = Validation.isValidReview(reviewData)

      expect(result).to.eq(false)
    })

    describe('when checking its score', () => {
      it('checks it is >= 1', () => {
        reviewData.score = 0.9

        let result = Validation.isValidReview(reviewData)

        expect(result).to.eq(false)
      })
      it('checks it is <= 5', () => {
        reviewData.score = 5.1

        let result = Validation.isValidReview(reviewData)

        expect(result).to.eq(false)
      })
    })

    it('accepts a valid review', () => {
      let result = Validation.isValidReview(reviewData)

      expect(result).to.eq(true)
    })
  })
})
