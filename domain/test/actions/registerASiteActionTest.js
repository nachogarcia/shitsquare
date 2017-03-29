var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var expect = chai.expect;

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
