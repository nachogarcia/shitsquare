var Site = require('./Site.js');


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
    Site.sortSites(coord,allSites);
    return allSites;
  }

}

module.exports = SiteRepository
