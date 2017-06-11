const uuidV4 = require('uuid/v4')

function RegisterASiteAction (APIService) {
  function run (siteData) {
    const method = 'registerASite'
    const id = uuidV4()
    const params = { siteData }

    const body = { method, params, id }

    return APIService.run(body)
  }

  return { run }
}

export default RegisterASiteAction
