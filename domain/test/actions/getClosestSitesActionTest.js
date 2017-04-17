var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');

describe('Get closest sites Action', () => {
  it('gets the closest sites', () => {
    let siteRepository = {getClosest: () => Promise.resolve()};
    let getClosestSitesAction = new actions.GetClosestSitesAction(siteRepository);
    let coordinate = new Coordinate(0, 0);

    sinon.spy(siteRepository, 'getClosest');
    return getClosestSitesAction.run(coordinate).then( (sites) => {
      expect(siteRepository.getClosest).to.have.been.calledWith(coordinate);
    });
  });
});
