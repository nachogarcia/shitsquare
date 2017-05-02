export function siteToMapCoordinates (site) { return { lat: site.coordinate.x, lng: site.coordinate.y } }

export function mapToSiteCoordinates (marker) { return { x: marker.lat, y: marker.lng } }

export function browserToMapCoordinates (position) {
  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };
}
