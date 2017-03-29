class RegisterASiteAction{

  constructor(siteRepository) {
    this.siteRepository = siteRepository;
  };

  run(site) {
    this.siteRepository.put(site);
  }
}

module.exports = {
  RegisterASiteAction
}
