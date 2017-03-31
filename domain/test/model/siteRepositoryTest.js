var SiteRepository = require('../../src/model/SiteRepository.js');
var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');


describe('Site Repository', () => {
  let siteRepository;

  beforeEach( () => {
   siteRepository = new SiteRepository()
  });

  it('Stores a site', () => {
    let site = new Site("A site", new Coordinate(0,0));

    siteRepository.put(site);

    let storedSite = siteRepository.all()[0];
    expect(storedSite).to.equal(site);
  });

  it('returns the closest sites in order', () => {
    let currentPlace = new Coordinate(0,0);
    let closestSite = new Site("1", new Coordinate(1,1));
    let middleSite = new Site("2", new Coordinate(-3,10));
    let farthestSite = new Site("3", new Coordinate(100,-100));
    siteRepository.put(farthestSite);
    siteRepository.put(closestSite);
    siteRepository.put(middleSite);

    let closestSites = siteRepository.getClosest(currentPlace);

    expect(closestSites[0]).to.eq(closestSite);
    expect(closestSites[1]).to.eq(middleSite);
    expect(closestSites[2]).to.eq(farthestSite);
  });
});
