<template>
  <gmap-map :center="center" @zoom_changed="updateZoom" @center_changed="updateCenter" :zoom="zoom">

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
      ...Vuex.mapGetters(['zoom', 'center', 'closestSites']),
    },

    methods: {
      siteToMapCoordinates,

      ...Vuex.mapActions(['updateClosestSites']),

      updateZoom: function (zoom) {
        this.$store.commit('zoom', zoom);
      },

      updateCenter: function (mapCoordinate) {
        let lat = mapCoordinate.lat();
        let lng = mapCoordinate.lng();

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
