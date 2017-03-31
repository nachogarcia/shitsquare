var SiteRepository = require('../../src/model/SiteRepository.js');
var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');


describe('Site Repository', () => {
  let siteRepository;

  beforeEach( () => {
   siteRepository = new SiteRepository()
  });

  it('stores a site', () => {
    let site = new Site({id: "A site", coordinate: new Coordinate(0,0)});

    siteRepository.put(site);

    let storedSite = siteRepository.all()[0];
    expect(storedSite).to.equal(site);
  });

  it('finds by id', () => {
    let id = "1A";
    let site = new Site({id: id, coordinate: new Coordinate(0,0)});

    siteRepository.put(site);

    let storedSite = siteRepository.findById(id);
    expect(storedSite).to.equal(site);
  });

  it('returns the closest sites in order', () => {
    let currentPlace = new Coordinate(0,0);
    let closestSite = new Site({id: "1", coordinate: new Coordinate(1,1)});
    let middleSite = new Site({id: "2", coordinate: new Coordinate(-3,10)});
    let farthestSite = new Site({id: "3", coordinate: new Coordinate(100,-100)});
    siteRepository.put(farthestSite);
    siteRepository.put(closestSite);
    siteRepository.put(middleSite);

    let closestSites = siteRepository.getClosest(currentPlace);

    expect(closestSites[0]).to.eq(closestSite);
    expect(closestSites[1]).to.eq(middleSite);
    expect(closestSites[2]).to.eq(farthestSite);
  });
});
