const GetClosestSitesAction = require('../../src/actions/GetClosestSitesAction.js')

describe('GetClosestSitesAction', () => {
  it('gets the closest sites from the backend', () => {
    const APIService = { run: () => Promise.resolve() }
    sinon.spy(APIService, 'run')

    const coordinate = {}
    const action = GetClosestSitesAction(APIService)

    return action.run(coordinate).then(() => {
      expect(APIService.run).to.have.been.calledOnce
    })
  })
})
