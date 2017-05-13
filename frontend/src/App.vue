<template>
  <div id="app">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
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
