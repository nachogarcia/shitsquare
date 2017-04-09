<template>
  <gmap-map :center="center" @center_changed="getClosestSites" :zoom="16" style="width: 100%; padding-bottom: 56.25%;">
    <gmap-marker
      v-for="s in sites"
      :position="getMapCoordinates(s)"
      :clickable="true"
      @click="displaySite(s)" />
  </gmap-map>
</template>

<script>
  import { sendRegisterASite, sendGetClosest, sendAddReview } from "../actions.js"
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
    load: {
      key: '',
    }
  });

  export default {
    data: () => ({
      center: {lat: 41.6446231, lng: -0.896913},
      sites: [],
    }),
    methods: {
      getClosestSites: function () {
        sendGetClosest(this.getSiteCoordinates(this.center)).then((response) => {
          this.sites = response.body.result
        });
      },
      getMapCoordinates: function (site) { return {lat: site.coordinate.x, lng: site.coordinate.y}},
      getSiteCoordinates: function (marker) { return {x: marker.lat, y: marker.lng}},
      displaySite: site => {console.log(site)},
    },
    name: 'map',

    beforeCreate() {
      let siteData = { name: "A site", coordinate: {x: 41.6449231, y: -0.899913} }
      sendRegisterASite(siteData).then((response) => {
        console.log("Added site", response.body.result)
      })

    }
  }
</script>
