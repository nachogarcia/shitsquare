const url = 'http://localhost:8000/api'

export function sendRegisterASite(siteData) {
  let method = 'registerASite'
  let id = '1'
  let params = {}
  params.siteData = siteData;

  let body = { method, params, id }

  return post(body)
}

export function sendGetClosestSites (coordinate) {
  let method = 'getClosestSites'
  let id = '2'
  let params = {};
  params.coordinate = coordinate;

  let body = { method, params, id }

  return post(body)
}

export function sendRegisterAReview (reviewData, siteId) {
  let method = 'registerAReview'
  let id = '3'
  let params = [reviewData, siteId];
  let body = { method, params, id }

  return post(body)
}

function post (body) {
  let fetchData = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  return fetch(url, fetchData)
  .then(response => response.json() );
}
