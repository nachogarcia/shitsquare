var SiteRepository = require('../../src/model/SiteRepository.js');
var actions = require('../../src/actions.js');
var Factory = require('../../src/Factory.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');
var Migrator = require('../../src/infrastructure/Migrator.js');


describe('Site Repository', () => {
  let siteRepository;
  let site;

  beforeEach( () => {
    let factory = new Factory();
    let migrator = new Migrator(factory);
    migrator.resetDB();

    siteRepository = factory.createSiteRepository();
    site = new Site({id: siteRepository.nextSiteId(), name: "Test site", coordinate: new Coordinate(0,0)});
  });

  it("generates next id's", () => {
    expect(siteRepository.nextSiteId()).to.not.be.undefined;
    expect(siteRepository.nextReviewId()).to.not.be.undefined;
  });

  it('stores a site', () => {
    siteRepository.put(site);

    return siteRepository.findById(site.id).then( (storedSite) => {
      expect(storedSite).to.deep.equal(site);
    });
  });

  it('updates a site', () => {
    siteRepository.put(site).then((site) => {
      site.name = "changed name"
      siteRepository.put(site);
    });

    return siteRepository.findById(site.id).then( (storedSite) => {
      expect(storedSite).to.deep.equal(site);
    });
  });

  it('finds by id', () => {
    siteRepository.put(site);

    return siteRepository.findById(site.id).then( storedSite =>
      expect(storedSite).to.deep.equal(site));
  });

  describe('when returning the closest sites', () => {
    let currentPlace;
    let closestSite;
    let middleSite;
    let farthestSite;

    beforeEach( () => {
      currentPlace = new Coordinate(0,0);
      closestSite = new Site({id: siteRepository.nextSiteId(), name: "Test site", coordinate: new Coordinate(1,1)});
      middleSite = new Site({id: siteRepository.nextSiteId(), name: "Test site", coordinate: new Coordinate(-3,10)});
      farthestSite = new Site({id: siteRepository.nextSiteId(), name: "Test site", coordinate: new Coordinate(100,-100)});
    });

    it('returns the sites in order', () => {
      Promise.all([
        siteRepository.put(farthestSite),
        siteRepository.put(closestSite),
        siteRepository.put(middleSite)
      ]);

      return siteRepository.getClosest(currentPlace,3).then( (closestSites) => {
        expect(closestSites[0]).to.deep.eq(closestSite);
        expect(closestSites[1]).to.deep.eq(middleSite);
        expect(closestSites[2]).to.deep.eq(farthestSite);
        expect(closestSites.length).to.eq(3);
      });

    });
  });
});
