var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');

describe('Get closest sites Action', () => {
  let siteRepository;
  let getClosestSitesAction;
  let coordinate;

  beforeEach( () => {
    siteRepository = {getClosest: () => Promise.resolve()};
    getClosestSitesAction = new actions.GetClosestSitesAction(siteRepository);
    coordinate = new Coordinate(0, 0);

    sinon.spy(siteRepository, 'getClosest');
  });

  it('Returns a rejected promise if the coordinate is invalid', () => {
    return getClosestSitesAction.run("An invalid coordinate").then().catch(error =>
      expect(error).to.deep.eq(new Error("Invalid Coordinate"))
    );
  });

  it('gets the closest sites', () => {
    return getClosestSitesAction.run(coordinate).then( (sites) => {
      expect(siteRepository.getClosest).to.have.been.calledWith(coordinate);
    });
  });
});
