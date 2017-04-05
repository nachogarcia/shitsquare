const url = 'http://localhost:8000/api'

export function sendRegisterASite(siteData) {
  let method = 'registerASite'
  let id = '1'

  let body = { method, params: siteData, id }

  return post(body)
}

export function sendGetClosest (coordinate) {
  let method = 'getClosest'
  let id = '2'

  let body = { method, params: coordinate, id }

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
