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
}

module.exports = {
  SiteRepository
}
