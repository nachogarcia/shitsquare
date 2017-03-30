var sites = require('./Site.js');


class SiteRepository{

  constructor() {
    this.sites = [];
  };

  put(site) {
    this.sites.push(site);
  };

  all(){
    return this.sites;
  };

  getClosest(coord) {
    let allSites = this.all();
    sites.Site.sortSites(coord,allSites);
    return allSites;
  }

}

module.exports = {
  SiteRepository
}
