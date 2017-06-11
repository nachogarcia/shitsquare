const RegisterAReviewAction = require('../../src/actions/RegisterAReviewAction.js')

describe('RegisterAReviewAction', () => {
  it('registers a review on the backend', () => {
    const APIService = { run: () => Promise.resolve() }
    sinon.spy(APIService, 'run')

    const siteId = ''
    const reviewData = {}

    const action = RegisterAReviewAction(APIService)

    return action.run({siteId, reviewData}).then(() => {
      expect(APIService.run).to.have.been.calledOnce
    })
  })
})
