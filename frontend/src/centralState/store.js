import Factory from '../Factory'
import { mapToSiteCoordinates } from '../utils'

import Vue from 'vue'
import Vuex from 'vuex'

const factory = new Factory()
const getClosestSitesAction = factory.createGetClosestSitesAction()
const getCurrentPositionAction = factory.createGetCurrentPositionAction()

Vue.use(Vuex)

const state = {
  currentSite: {},
  zoom: 17,
  center: { lat: 0, lng: 0 },
  closestSites: []
}

const mutations = {
  currentSite (state, currentSite) {
    state.currentSite = currentSite
  },

  zoom (state, zoom) {
    state.zoom = zoom
  },

  center (state, center) {
    state.center = center
  },

  closestSites (state, closestSites) {
    state.closestSites = closestSites
  }
}

const actions = {
  setInitialLocation ({ commit }) {
    getCurrentPositionAction.run().then((position) => {
      commit('center', position)
    })
  },

  updateClosestSites ({ commit, state }) {
    getClosestSitesAction.run(mapToSiteCoordinates(state.center)).then((response) => {
      commit('closestSites', response)
    })
  }
}

const getters = {
  currentSite: state => state.currentSite,
  zoom: state => state.zoom,
  center: state => state.center,
  closestSites: state => state.closestSites
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
