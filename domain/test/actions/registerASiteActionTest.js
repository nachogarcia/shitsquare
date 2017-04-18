var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');

describe('Register a Site Action', () => {
  it('adds site to repository', () => {
    let siteRepository = {put: () => Promise.resolve(),
      nextSiteId: () => 'siteId',
      nextReviewId: () => 'reviewId'};
    sinon.spy(siteRepository, 'put');

    let siteData = {id: siteRepository.nextSiteId(), name: "A site", coordinate: new Coordinate(0,0)};
    let registerASiteAction = new actions.RegisterASiteAction(siteRepository);

    return registerASiteAction.run(siteData).then( (site) => {
      expect(siteRepository.put).to.have.been.calledWith(site);
    });
  });
});
