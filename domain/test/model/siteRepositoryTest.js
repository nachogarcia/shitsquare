var repositories = require('../../src/model/SiteRepository.js');


describe('Site Repository', () => {
  it('Stores a site', () => {
    let siteRepository = new repositories.SiteRepository();
    let site = {name:"A site"};

    siteRepository.put(site);
    let storedSite = siteRepository.all()[0];

    expect(storedSite).to.equal(site);
  });
});
