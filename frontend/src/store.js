import { sendRegisterASite, sendGetClosestSites, getCurrentPosition } from "./actions.js"
import { siteToMapCoordinates, mapToSiteCoordinates } from "./utils.js"

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
    getCurrentPosition().then( (position) => {
      commit('center', position);
    })
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
