class Dispatcher {
  constructor(factory){
    this.factory = factory
  }

  run(req) {
    let method = req.body.method
    let params = req.body.params
    let id = req.body.id
    let result = {}

    switch (method) {
      case 'registerASite':
        result = this.registerASite(params)
        break
      case 'getClosest':
        result = this.getClosest(params)
        break
      case 'registerAReview':
        result = this.registerAReview(params)
        break
    }

    return this.respond(result, id)
  }

  respond(result, id){
    let response = {
      body: {
        jsonrpc: "2.0",
        result: result,
        id: id
      }
    }
    return response;
  }

  registerASite(siteData) {
    let registerASiteAction = this.factory.createRegisterASiteAction();
    return registerASiteAction.run(siteData);
  }

  getClosest(coordinate) {
    let getClosestSitesAction = this.factory.createGetClosestSitesAction();
    return getClosestSitesAction.run(coordinate);
  }

  registerAReview(params) {
    let reviewData = params.reviewData
    let siteData = params.siteData
    let registerAReviewAction = this.factory.createRegisterAReviewAction();
    return registerAReviewAction.run(params.reviewData, params.siteId);
  }
}

module.exports = Dispatcher
