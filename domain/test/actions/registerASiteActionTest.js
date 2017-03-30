var actions = require('../../src/actions.js');
var sites = require('../../src/model/Site.js');

describe('Register a Site Action', () => {
  it('adds site to repository', () => {
    let siteRepository = {put: () => {}};
    sinon.spy(siteRepository, 'put');

    let site = new sites.Site("A site");
    let registerASiteAction = new actions.RegisterASiteAction(siteRepository);

    registerASiteAction.run(site);

    expect(siteRepository.put).to.have.been.calledWith(site);
  });
});
