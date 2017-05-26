import { sendRegisterASite, sendGetClosestSites } from "./actions.js"
import { siteToMapCoordinates, mapToSiteCoordinates, browserToMapCoordinates, ipLocationToMapCoordinates } from "./utils.js"

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentSite: {},
  zoom: 17,
  center: { lat: 0, lng: 0 },
  closestSites: []
}

const mutations = {
  currentSite (state, currentSite) {
    state.currentSite = currentSite;
  },

  zoom(state, zoom) {
    state.zoom = zoom;
  },

  center(state, center) {
    state.center = center;
  },

  closestSites(state, closestSites) {
    state.closestSites = closestSites;
  }
}

const actions = {
  setInitialLocation ({ commit }) {
    navigator.geolocation.getCurrentPosition( (position) => {
      position = browserToMapCoordinates(position);
      commit('center', position);
    }, (error) => {
      let headers = new Headers();

      let options = {
        method: 'GET',
        headers: headers,
        mode: 'cors',
        cache: 'default'
      };

      fetch('https://ipapi.co/json/', options)
        .then(response => response.json())
        .then((data) => {
        let position = ipLocationToMapCoordinates(data);
        commit('center', position);
      })
    });
  },

  updateClosestSites ({ commit, state }) {
    sendGetClosestSites(mapToSiteCoordinates(state.center)).then((response) => {
      commit('closestSites', response);
    });
  },
}

const getters = {
  currentSite: state => state.currentSite,
  zoom: state => state.zoom,
  center: state => state.center,
  closestSites: state => state.closestSites,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
