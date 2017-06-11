import RegisterASiteAction from '../../src/actions/RegisterASiteAction.js'

describe('RegisterASiteAction', () => {
  it('registers a site on the backend', () => {
    const APIService = { run: () => Promise.resolve() }
    sinon.spy(APIService, 'run')

    const siteData = {}
    const action = RegisterASiteAction(APIService)

    return action.run(siteData).then(() => {
      expect(APIService.run).to.have.been.calledOnce
    })
  })
})
