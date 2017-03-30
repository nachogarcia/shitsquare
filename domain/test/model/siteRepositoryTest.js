var repositories = require('../../src/model/SiteRepository.js');
var actions = require('../../src/actions.js');
var sites = require('../../src/model/Site.js');
var coordinates = require('../../src/model/Coordinate.js');


describe('Site Repository', () => {
  let siteRepository;

  beforeEach( () => {
   siteRepository = new repositories.SiteRepository()
  });

  it('Stores a site', () => {
    let site = new sites.Site("A site", new coordinates.Coordinate(0,0));

    siteRepository.put(site);

    let storedSite = siteRepository.all()[0];
    expect(storedSite).to.equal(site);
  });

  it('returns the closest sites in order', () => {
    let currentPlace = new coordinates.Coordinate(0,0);
    let closestSite = new sites.Site("1", new coordinates.Coordinate(1,1));
    let middleSite = new sites.Site("2", new coordinates.Coordinate(-3,10));
    let farthestSite = new sites.Site("3", new coordinates.Coordinate(100,-100));
    siteRepository.put(farthestSite);
    siteRepository.put(closestSite);
    siteRepository.put(middleSite);

    let closestSites = siteRepository.getClosest(currentPlace);

    expect(closestSites[0]).to.eq(closestSite);
    expect(closestSites[1]).to.eq(middleSite);
    expect(closestSites[2]).to.eq(farthestSite);
  });
});
