<template>
  <gmap-map :center="center" @center_changed="updateCenter" :zoom="16">

    <gmap-marker
      v-for="site in closestSites"
      :key="site.id"
      :position="siteToMapCoordinates(site)"
      :clickable="true"
      @click="displaySite(site)" />

  </gmap-map>
</template>

<script>
  import { siteToMapCoordinates } from "../utils.js"
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';
  import * as Vuex from 'vuex';

  Vue.use(VueGoogleMaps, {
    load: { key: process.env.GMAP_API_KEY, }
  });

  export default {
    name: 'Map',

    computed: {
      ...Vuex.mapGetters(['center', 'closestSites']),
    },

    methods: {
      siteToMapCoordinates,

      ...Vuex.mapActions(['updateClosestSites']),

      updateCenter: function (event) {
        let lat = event.lat();
        let lng = event.lng();

        this.$store.commit('center', {lat, lng});
        this.updateClosestSites();
      },

      displaySite: function (site) {
        this.$store.commit('currentSite', site);
        this.$router.push('site');
      },
    },
  }
</script>

<style>
  html, body, #app, .vue-map-container {
    height: 100%;
    width: 100%;
  }
</style>
