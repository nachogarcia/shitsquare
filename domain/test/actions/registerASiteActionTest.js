var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');

describe('Register a Site Action', () => {
  let siteRepository;
  let registerASiteAction;
  let siteData;

  beforeEach( () => {
    siteRepository = {
      put: () => Promise.resolve(),
      nextSiteId: () => 'siteId',
      nextReviewId: () => 'reviewId'
    };
    sinon.spy(siteRepository, 'put');

    siteData = {id: siteRepository.nextSiteId(), name: "A site", coordinate: new Coordinate(0,0)};

    registerASiteAction = new actions.RegisterASiteAction(siteRepository);
  });

  it('Returns a rejected promise if the site data is invalid', () => {
    return registerASiteAction.run("Invalid Data").then().catch( error =>
      expect(error).to.deep.eq(new Error("Invalid Site Data"))
    );
  });

  it('adds site to repository', () => {
    return registerASiteAction.run(siteData).then( (site) => {
      expect(siteRepository.put).to.have.been.calledWith(site);
    });
  });
});
