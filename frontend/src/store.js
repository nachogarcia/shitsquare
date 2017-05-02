import { sendRegisterASite, sendGetClosestSites } from "./actions.js"
import { siteToMapCoordinates, mapToSiteCoordinates, browserToMapCoordinates } from "./utils.js"

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentSite: {},
  center: { lat: 0, lng: 0 },
  closestSites: []
}

const mutations = {
  currentSite (state, currentSite) {
    state.currentSite = currentSite;
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
      let center = browserToMapCoordinates(position);
      commit('center', center);
    });
  },

  updateClosestSites ({ commit, state }) {
    sendGetClosestSites(mapToSiteCoordinates(state.center)).then((response) => {
      commit('closestSites', response.body.result);
    });
  },
}

const getters = {
  currentSite: state => state.currentSite,
  center: state => state.center,
  closestSites: state => state.closestSites,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
