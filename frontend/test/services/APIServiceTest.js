const APIService = require('../../src/services/APIService.js')

describe('APIService', () => {
  let service

  beforeEach(() => {
    service = APIService()
  })

  it('returns a resolved promise with the result of the petition', () => {
    const method = 'getClosestSites'
    const id = '1'
    const params = { coordinate: { x: 0, y: 0 }}
    const body = { method, params, id }

    return service.run(body).then((response) => {
      expect(response).not.to.be.undefined
    })
  })

  it('returns a rejected promise if there is a problem', () => {
    return service.run().catch((error) => {
      expect(error).not.to.be.undefined
    })
  })
})
