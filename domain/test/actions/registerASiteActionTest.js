var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');
var Coordinate = require('../../src/model/Coordinate.js');

describe('Register a Site Action', () => {
  it('adds site to repository', () => {
    let siteRepository = {put: () => {}};
    sinon.spy(siteRepository, 'put');

    let siteData = {id: "A site", coordinate: new Coordinate(0,0)};
    let site = new Site(siteData);
    let registerASiteAction = new actions.RegisterASiteAction(siteRepository);

    registerASiteAction.run(siteData);

    expect(siteRepository.put).to.have.been.calledWith(site);
  });
});
