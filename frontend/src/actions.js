const url = 'http://localhost:8000/api'

export function sendRegisterASite(siteData) {
  let method = 'registerASite'
  let id = '1'

  let body = { method: method, params: siteData, id: id }

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

export function sendGetClosest (coordinate) {
  let method = 'getClosest'
  let id = '2'
  let params = { coordinate: coordinate }

  let body = { method: method, params: params, id: id }

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
