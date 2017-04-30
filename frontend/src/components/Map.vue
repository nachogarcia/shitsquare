<template>
  <gmap-map :center="center" @center_changed="getClosestSites" :zoom="16">

    <gmap-marker
      v-for="site in sites"
      :key="site.id"
      :position="getMapCoordinates(site)"
      :clickable="true"
      @click="displaySite(site)" />

  </gmap-map>
</template>

<script>
  import { sendRegisterASite, sendGetClosestSites } from "../actions.js"
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';
  import * as Vuex from 'vuex';

  Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.GMAP_API_KEY,
    }
  });

  export default {
    name: 'Map',

    data: () => ({
      center: { lat: 0, lng: 0 },
      sites: [],
    }),

    methods: {
      getClosestSites: function () {
        sendGetClosestSites(this.getSiteCoordinates(this.center)).then((response) => {
          this.sites = response.body.result
        });
      },

      getMapCoordinates: function (site) { return { lat: site.coordinate.x, lng: site.coordinate.y } },

      getSiteCoordinates: function (marker) { return { x: marker.lat, y: marker.lng } },

      displaySite: function (site) {
        this.$store.commit('currentSite', site);
        this.$router.push('site');
      },
    },

    beforeMount() {
      let self = this;
      navigator.geolocation.getCurrentPosition((position) => {
        self.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });

      this.getClosestSites();
    },
  }
</script>

<style>
  html, body, #app, .vue-map-container {
    height: 100%;
    width: 100%;
  }
</style>
