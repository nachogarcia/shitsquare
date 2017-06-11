const uuidV4 = require('uuid/v4')

function GetClosestSitesAction (APIService) {
  function run (coordinate) {
    const method = 'getClosestSites'
    const id = uuidV4()
    const params = { coordinate }

    const body = { method, params, id }

    return APIService.run(body)
  }

  return { run }
}

export default GetClosestSitesAction
