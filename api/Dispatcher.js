class Dispatcher {
  constructor(factory){
    this.factory = factory
  }

  run(req, res) {
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

    this.respond(res, result, id)
  }

  respond(res, result, id){
    let response = {
      body: {
        jsonrpc: "2.0",
        result: result,
        id: id
      }
    }
    res.send(response)
  }

  registerASite(siteData) {
    let registerASiteAction = this.factory.createRegisterASiteAction();
    return registerASiteAction.run(siteData);
  }

  getClosest(coord) {
    let siteRepository = this.factory.createSiteRepository();
    return siteRepository.getClosest(coord,10);
  }

  registerAReview(params) {
    let reviewData = params.reviewData
    let siteData = params.siteData
    let registerAReviewAction = this.factory.createRegisterAReviewAction();
    return registerAReviewAction.run(params.reviewData, params.siteId);
  }
}

module.exports = Dispatcher
