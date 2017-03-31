var actions = require('../../src/actions.js');
var Site = require('../../src/model/Site.js');

describe('Register a Site Action', () => {
  it('adds site to repository', () => {
    let siteRepository = {put: () => {}};
    sinon.spy(siteRepository, 'put');

    let siteData = "A site"
    let site = new Site(siteData);
    let registerASiteAction = new actions.RegisterASiteAction(siteRepository);

    registerASiteAction.run(siteData);

    expect(siteRepository.put).to.have.been.calledWith(site);
  });
});
