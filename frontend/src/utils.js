function siteToMapCoordinates (site) { return { lat: site.coordinate.x, lng: site.coordinate.y } }

function mapToSiteCoordinates (marker) { return { x: marker.lat, y: marker.lng } }

function browserToMapCoordinates (position) {
  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  }
}

function ipLocationToMapCoordinates (data) { return { lat: data.latitude, lng: data.longitude } }

function formatDate (dateString) {
  return new Date(dateString).toLocaleDateString()
}

function getSiteScore (site) {
  if (site.reviews.length == 0) return 0

  let score = 0
  site.reviews.forEach(review => score += review.score)
  return score / site.reviews.length
}

module.exports = { siteToMapCoordinates,
  mapToSiteCoordinates,
  browserToMapCoordinates,
  ipLocationToMapCoordinates,
  formatDate,
  getSiteScore
}
