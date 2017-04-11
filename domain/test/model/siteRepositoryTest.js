var SiteRepository = require('../../src/model/SiteRepository.js');
var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');


describe('Site Repository', () => {
  let siteRepository;
  let site;

  beforeEach( () => {
    siteRepository = new SiteRepository();
    site = new Site({id: siteRepository.nextSiteId(), name: "Test site", coordinate: new Coordinate(0,0)});
  });

  it("generates next id's", () => {
    expect(siteRepository.nextSiteId()).to.not.be.undefined;
    expect(siteRepository.nextReviewId()).to.not.be.undefined;
  });

  it('stores a site', () => {
    siteRepository.put(site);

    let storedSite = siteRepository.all()[0];
    expect(storedSite).to.equal(site);
  });

  it('updates a site', () => {
    siteRepository.put(site);

    site.name = "changed name"
    siteRepository.put(site);

    let storedSite = siteRepository.all()[0];
    expect(storedSite).to.equal(site);
  });

  it('finds by id', () => {
    siteRepository.put(site);

    let storedSite = siteRepository.findById(site.id);
    expect(storedSite).to.equal(site);
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
      siteRepository.put(farthestSite);
      siteRepository.put(closestSite);
      siteRepository.put(middleSite);

      let closestSites = siteRepository.getClosest(currentPlace,3);

      expect(closestSites[0]).to.eq(closestSite);
      expect(closestSites[1]).to.eq(middleSite);
      expect(closestSites[2]).to.eq(farthestSite);
    });

    it('returns the number of sites asked', () => {
      siteRepository.put(farthestSite);
      siteRepository.put(closestSite);

      let closestSites = siteRepository.getClosest(currentPlace,1);

      expect(closestSites.length).to.eq(1);
    });

    it('returns the number of sites avaible if there are less than asked', () => {
      siteRepository.put(farthestSite);
      siteRepository.put(closestSite);

      let closestSites = siteRepository.getClosest(currentPlace,1);

      closestSites = siteRepository.getClosest(currentPlace,3);
      expect(closestSites.length).to.eq(2);
    });
  });
});
