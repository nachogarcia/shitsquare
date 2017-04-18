<template>
  <gmap-map :center="center" @center_changed="getClosestSites" :zoom="16" style="width: 100%; height:100%;">

    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPosition"
      :opened="infoWindowOpen"
      :content="infoContent"
      @closeclick="infoWindowOpen=false" />

    <gmap-marker
      v-for="site in sites"
      :key="site.id"
      :position="getMapCoordinates(site)"
      :clickable="true"
      @click="toggleInfoWindow(site)" />

  </gmap-map>
</template>

<script>
  import { sendRegisterASite, sendGetClosest, sendAddReview } from "../actions.js"
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
    load: {
      key: process.env.GMAP_API_KEY,
    }
  });

  export default {
    data: () => ({
      center: { lat: 0, lng: 0 },
      sites: [],
      infoContent: '',
      infoWindowPosition: {
        lat: 0,
        lng: 0
      },
      infoWindowOpen: false,
      currentWindowId: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }),

    methods: {
      getClosestSites: function () {
        sendGetClosest(this.getSiteCoordinates(this.center)).then((response) => {
          this.sites = response.body.result
        });
      },

      getMapCoordinates: function (site) { return {lat: site.coordinate.x, lng: site.coordinate.y}},

      getSiteCoordinates: function (marker) { return {x: marker.lat, y: marker.lng}},

      displaySite: function (site) {
        this.$router.push('/site');
      },

      toggleInfoWindow: function (site) {
        this.infoWindowPosition = this.getMapCoordinates(site);
        this.infoContent = site.name;
        if (this.currentWindowId == site.id) {
          this.infoWindowOpen = !this.infoWindowOpen;
        }
        else {
          this.infoWindowOpen = true;
          this.currentWindowId = site.id;
        }
      },
    },

    name: 'map',

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
