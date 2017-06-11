import APIService from './services/APIService.js'
import IpLocationService from './services/IpLocationService.js'
import GetClosestSitesAction from './actions/GetClosestSitesAction.js'
import GetCurrentPositionAction from './actions/GetCurrentPositionAction.js'
import RegisterAReviewAction from './actions/RegisterAReviewAction.js'
import RegisterASiteAction from './actions/RegisterASiteAction.js'

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
    this.getClosestSitesAction = this.getClosestSitesAction || GetClosestSitesAction(this.createAPIService())
    return this.getClosestSitesAction
  }

  createGetCurrentPositionAction () {
    this.getCurrentPositionAction = this.getCurrentPositionAction || GetCurrentPositionAction(this.createIpLocationService())
    return this.getCurrentPositionAction
  }

  createRegisterAReviewAction () {
    this.registerAReviewAction = this.registerAReviewAction || RegisterAReviewAction(this.createAPIService())
    return this.registerAReviewAction
  }

  createRegisterASiteAction () {
    this.registerASiteAction = this.registerASiteAction || RegisterASiteAction(this.createAPIService())
    return this.registerASiteAction
  }
}

export default Factory
