const GetCurrentPositionAction = require('../../src/actions/GetCurrentPositionAction.js')

describe('GetCurrentPositionAction', () => {
  it('gets the current map position from a service', () => {
    const IpLocationService = { run: () => Promise.resolve({latitude: 0, longitude: 0}) }
    sinon.spy(IpLocationService, 'run')

    const coordinate = {}
    const action = GetCurrentPositionAction(IpLocationService)

    return action.run().then((position) => {
      expect(position).to.deep.eq({lat: 0, lng: 0})
    })
  })
})
