<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNav from './components/AppNav.vue'
import * as Vuex from 'vuex';

export default {
  name: 'app',
  components: { AppNav },

  created () {
    this.$store.dispatch('setInitialLocation')
  },
}
</script>
