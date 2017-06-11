require('isomorphic-fetch')

function APIService () {
  function run (body) {
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    return fetch(process.env.API_URL, fetchData)
    .then(response => response.json())
    .then(json => { return parseResponse(json) })
  }

  return { run }
}

function parseResponse (json) {
  if (json.body.result) return Promise.resolve(json.body.result)
  else return Promise.reject(json.body.error)
}

module.exports = APIService
