const Factory = require('src/Factory.js')
const factory = new Factory()

module.exports.registerASiteAction = (event, context, callback) => {
  handleAction(factory.createRegisterASiteAction(), event, context, callback)
}

module.exports.registerAReviewAction = (event, context, callback) => {
  handleAction(factory.createRegisterAReviewAction(), event, context, callback)
}

module.exports.getClosestSitesAction = (event, context, callback) => {
  handleAction(factory.createGetClosestSitesAction(), event, context, callback)
}

function handleAction (action, event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false

  action.run(event.body).then( result => {
    const response = generateResponse(200, result)
    callback(null, response)
  })
  .catch( error => {
    const response = generateResponse(400, error)
    callback(null, response)
  })
}

function generateResponse (code, result) {
  return {
    statusCode: code,
    headers: {
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(result)
  }
}
