import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentSite: {}
}

const mutations = {
  currentSite (state, currentSite) {
    state.currentSite = currentSite;
  },
}

const getters = {
  currentSite: state => state.currentSite
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})
