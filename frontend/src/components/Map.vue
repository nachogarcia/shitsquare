<template>
  <gmap-map
    :options="{styles}"
    :center="center"
    @zoom_changed="updateZoom"
    @center_changed="updateCenter"
    :zoom="zoom">

    <gmap-marker
      v-for="site in closestSites"
      :key="site.id"
      :position="siteToMapCoordinates(site)"
      :icon="'/static/marker.png'"
      :clickable="true"
      @click="displaySite(site)" />

  </gmap-map>
</template>

<script>
  import Vue from 'vue';
  import * as Vuex from 'vuex';
  import * as VueGoogleMaps from 'vue2-google-maps';
  import { siteToMapCoordinates } from "../utils.js"

  Vue.use(VueGoogleMaps, {
    load: { key: process.env.GMAP_API_KEY, }
  });

  export default {
    name: 'Map',

    data: () => ({
      waitingToUpdateSites: false,
      styles: [
        { "featureType": "poi",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ]
    }),

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
        const TIME_BETWEEN_UPDATES = 1500;

        let lat = mapCoordinate.lat();
        let lng = mapCoordinate.lng();

        this.$store.commit('center', {lat, lng});

        if (!this.waitingToUpdateSites) {
          this.waitingToUpdateSites = true;
          setTimeout( () => {
            this.updateClosestSites();
            this.waitingToUpdateSites = false;
          }, TIME_BETWEEN_UPDATES);
        }
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
