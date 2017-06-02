import { browserToMapCoordinates, ipLocationToMapCoordinates } from "./utils.js"
const uuidV4 = require('uuid/v4');

export function sendRegisterASite(siteData) {
  let method = 'registerASite'
  let id = uuidV4();
  let params = {}
  params.siteData = siteData;

  let body = { method, params, id }

  return post(body)
}

export function sendGetClosestSites (coordinate) {
  let method = 'getClosestSites'
  let id = uuidV4();
  let params = {};
  params.coordinate = coordinate;

  let body = { method, params, id }

  return post(body)
}

export function sendRegisterAReview (reviewData, siteId) {
  let method = 'registerAReview'
  let id = uuidV4();
  let params = [reviewData, siteId];
  let body = { method, params, id }

  return post(body)
}

export function getCurrentPosition () {
  return getPositionFromNavigator().then( (position) => {
    return browserToMapCoordinates(position);
  }).catch( (error) => {
    return getPositionByIP();
  });
}

function getPositionFromNavigator (options) {
  return new Promise( (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

function getPositionByIP () {
  const SERVICE_URL = 'https://ipapi.co/json/';
  let headers = new Headers();

  let options = {
    method: 'GET',
    headers: headers,
    mode: 'cors',
    cache: 'default'
  };

  return fetch(SERVICE_URL, options)
    .then(response => response.json())
    .then((data) => {
      let position = ipLocationToMapCoordinates(data);
      return position
    });
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
  return fetch(process.env.API_URL, fetchData)
  .then(response => response.json() )
  .then(json => { return parseResponse(json) });
}

function parseResponse (json) {
  if (json.body.result) return Promise.resolve(json.body.result)
  else return Promise.reject(json.body.error)
}
