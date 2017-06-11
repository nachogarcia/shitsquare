import { browserToMapCoordinates, ipLocationToMapCoordinates } from '../utils.js'

function GetCurrentPositionAction (IpLocationService) {
  function run () {
    return getPositionFromNavigator().then(position => {
      return browserToMapCoordinates(position)
    }).catch(() => {
      return IpLocationService.run().then(response => {
        return ipLocationToMapCoordinates(response)
      })
    })
  }

  return { run }
}

function getPositionFromNavigator (options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

export default GetCurrentPositionAction
