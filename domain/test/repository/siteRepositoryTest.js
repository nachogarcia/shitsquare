var SiteRepository = require('../../src/model/SiteRepository.js')
var actions = require('../../src/actions.js')
var Factory = require('../../src/Factory.js')
var Site = require('../../src/model/Site.js')
var Review = require('../../src/model/Review.js')
var Coordinate = require('../../src/model/Coordinate.js')
var Migrator = require('../../src/infrastructure/Migrator.js')

describe('Site Repository', () => {
  let siteRepository
  let site

  beforeEach(() => {
    let factory = new Factory()
    let migrator = factory.createMigrator()
    siteRepository = factory.createSiteRepository()
    return migrator.resetDB().then((result) => {
      let review = new Review({
        id: siteRepository.nextReviewId(),
        author: 'An autor',
        score: 5,
        comment: 'A comment',
        time: 'A time'})

      site = new Site({
        id: siteRepository.nextSiteId(),
        name: 'Test site',
        coordinate: new Coordinate(0, 0),
        reviews: [review]})
    })
  })

  it("generates next id's", () => {
    expect(siteRepository.nextSiteId()).to.not.be.undefined
    expect(siteRepository.nextReviewId()).to.not.be.undefined
  })

  it('stores a site', () => {
    return siteRepository.put(site).then((result) => {
      return siteRepository.findById(site.id).then((storedSite) => {
        expect(storedSite).to.deep.equal(site)
      })
    })
  })

  it('updates a site', () => {
    return siteRepository.put(site).then((result) => {
      site.name = 'changed name'

      let review = new Review({
        id: siteRepository.nextReviewId(),
        author: 'Second Review',
        score: 0,
        comment: 'Another comment',
        time: 'Another time'})

      site.addReview(review)
      return siteRepository.put(site)
    }).then((result) => {
      return siteRepository.findById(site.id).then((storedSite) => {
        expect(storedSite).to.deep.equal(site)
      })
    })
  })

  it('finds by id', () => {
    siteRepository.put(site)

    return siteRepository.findById(site.id).then(storedSite =>
      expect(storedSite).to.deep.equal(site))
  })

  describe('when returning the closest sites', () => {
    let currentPlace
    let closestSite
    let middleSite
    let farthestSite

    beforeEach(() => {
      let review = new Review({
        id: siteRepository.nextReviewId(),
        author: 'Second Review',
        score: 0,
        comment: 'Another comment',
        time: 'Another time'})

      currentPlace = new Coordinate(0, 0)

      closestSite = new Site({
        id: siteRepository.nextSiteId(),
        name: 'Test Site 1',
        coordinate: new Coordinate(1, 1),
        reviews: [review]})

      middleSite = new Site({id: siteRepository.nextSiteId(), name: 'Test site', coordinate: new Coordinate(-3, 10)})

      farthestSite = new Site({id: siteRepository.nextSiteId(), name: 'Test site', coordinate: new Coordinate(100, -100)})
    })

    it('returns the sites in order', () => {
      Promise.all([
        siteRepository.put(farthestSite),
        siteRepository.put(closestSite),
        siteRepository.put(middleSite)
      ])

      return siteRepository.getClosest(currentPlace, 3).then((closestSites) => {
        expect(closestSites[0]).to.deep.eq(closestSite)
        expect(closestSites[1]).to.deep.eq(middleSite)
        expect(closestSites[2]).to.deep.eq(farthestSite)
        expect(closestSites.length).to.eq(3)
      })
    })
  })
})
