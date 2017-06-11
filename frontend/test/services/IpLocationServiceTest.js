const IpLocationService = require('../../src/services/IpLocationService.js')

describe('IpLocationService', () => {
  it('returns a resolved promise with the result of the petition', () => {
    const service = IpLocationService()

    return service.run().then((response) => {
      expect(response).not.to.be.undefined
    })
  })
})
