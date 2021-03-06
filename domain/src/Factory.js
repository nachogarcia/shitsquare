var SiteRepository = require('./model/SiteRepository.js')
var Migrator = require('./infrastructure/Migrator.js')
var Clock = require('./infrastructure/Clock.js')
var actions = require('./actions.js')
var Validator = require('./model/Validator.js')
var Client = require('pg').Client

class Factory {
  createClock () {
    this.clock = this.clock || new Clock()
    return this.clock
  }

  createDBConnection () {
    this.DBConnection = this.DBConnection || new Client(process.env.DATABASE_URL)
    return this.DBConnection
  }

  createSiteRepository () {
    this.siteRepository = this.siteRepository || new SiteRepository(this.createDBConnection())
    return this.siteRepository
  }

  createRegisterAReviewAction () {
    this.registerAReviewAction = this.registerAReviewAction || new actions.RegisterAReviewAction(this.createSiteRepository(), this.createClock())
    return this.registerAReviewAction
  }

  createRegisterASiteAction () {
    this.registerASiteAction = this.registerASiteAction || new actions.RegisterASiteAction(this.createSiteRepository())
    return this.registerASiteAction
  }

  createGetClosestSitesAction () {
    this.getClosestSitesAction = this.getClosestSitesAction || new actions.GetClosestSitesAction(this.createSiteRepository())
    return this.getClosestSitesAction
  }

  createValidator () {
    this.validator = this.validator || new Validator()
    return this.validator
  }

  createMigrator () {
    this.migrator = this.migrator || new Migrator(
      this.createDBConnection(),
      this.createRegisterASiteAction(),
      this.createRegisterAReviewAction()
    )
    return this.migrator
  }
}

module.exports = Factory
