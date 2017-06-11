const uuidV4 = require('uuid/v4')

function RegisterAReviewAction (APIService) {
  function run (reviewData, siteId) {
    const method = 'registerAReview'
    const id = uuidV4()
    const params = [reviewData, siteId]

    const body = { method, params, id }

    return APIService.run(body)
  }

  return { run }
}

module.exports = RegisterAReviewAction
