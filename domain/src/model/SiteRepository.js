var Site = require('./Site.js');


class SiteRepository{

  constructor() {
    this.sites = [];
  };

  put(site) {
    let toUpdate = this.findById(site.id);
    if (toUpdate) toUpdate = site;
    else this.sites.push(site);
  };

  all(){
    return this.sites;
  };

  getClosest(coord, numberOfSites) {
    let allSites = this.all();
    numberOfSites = Math.min(allSites.length, numberOfSites);
    Site.sortSites(coord,allSites);
    return allSites.slice(0, numberOfSites);
  };

  findById(id){
    for (let site of this.sites) {
      if (site.id == id) return site;
    }
  };

}

module.exports = SiteRepository
