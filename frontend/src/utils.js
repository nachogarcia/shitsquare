export function siteToMapCoordinates (site) { return { lat: site.coordinate.x, lng: site.coordinate.y } }

export function mapToSiteCoordinates (marker) { return { x: marker.lat, y: marker.lng } }

export function browserToMapCoordinates (position) {
  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
}

export function formatDate (dateString) {
  return new Date(dateString).toLocaleDateString();
}

export function getSiteScore(site) {
  let score = 0;
  site.reviews.forEach( review => score += review.score );
  return score / site.reviews.length;
}
