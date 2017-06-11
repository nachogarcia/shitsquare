const APIService = require('./services/APIService.js')
const IpLocationService = require('./services/IpLocationService.js')
const GetClosestSitesAction = require('./actions/GetClosestSitesAction.js')
const GetCurrentPositionAction = require('./actions/GetCurrentPositionAction.js')
const RegisterAReviewAction = require('./actions/RegisterAReviewAction.js')
const RegisterASiteAction = require('./actions/RegisterASiteAction.js')

class Factory {
  createIpLocationService () {
    this.ipLocationService = this.ipLocationService || IpLocationService()
    return this.ipLocationService
  }

  createAPIService () {
    this.apiService = this.apiService || APIService()
    return this.apiService
  }

  createGetClosestSitesAction () {
    this.getClosestSitesAction = this.getClosestSitesAction || GetClosestSitesAction()
    return this.getClosestSitesAction
  }

  createGetCurrentPositionAction () {
    this.getCurrentPositionAction = this.getCurrentPositionAction || GetCurrentPositionAction()
    return this.getCurrentPositionAction
  }

  createRegisterAReviewAction () {
    this.registerAReviewAction = this.registerAReviewAction || RegisterAReviewAction()
    return this.registerAReviewAction
  }

  createRegisterASiteAction () {
    this.registerASiteAction = this.registerASiteAction || RegisterASiteAction()
    return this.registerASiteAction
  }
}

module.exports = Factory
