var actions = require('../../src/actions.js');

describe('Register a Site Action', () => {
  it('adds site to repository', () => {
    var siteRepository = {put: () => {}};
    sinon.spy(siteRepository, 'put');

    var site = {name:"A site"};
    var registerASiteAction = new actions.RegisterASiteAction(siteRepository);

    registerASiteAction.run(site);

    expect(siteRepository.put).to.have.been.calledWith(site);
  });
});
