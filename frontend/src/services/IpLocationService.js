require('isomorphic-fetch')

const SERVICE_URL = 'https://ipapi.co/json/'

function IpLocationService () {
  function run () {
    const fetchData = {
      headers: new Headers(),
      method: 'GET',
      mode: 'cors',
      cache: 'default'
    }

    return fetch(SERVICE_URL, fetchData)
    .then(response => response.json())
  }

  return { run }
}

module.exports = IpLocationService
