<template>
  <gmap-map
    :center="center"
    :zoom="16"
    style="width: 100%; padding-bottom: 56.25%;"
  >
    <gmap-info-window :options="infoOptions" :position="infoWindowPos" :opened="infoWinOpen" :content="infoContent" @closeclick="infoWinOpen=false"></gmap-info-window>

        <gmap-marker :key="i" v-for="(m,i) in markers" :position="m.position" :clickable="true" @click="toggleInfoWindow(m,i)"></gmap-marker>
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
      center: {},
      markers: [],
      infoContent: '',
      infoWindowPos: {
        lat: 0,
        lng: 0
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }),
    methods: {
      toggleInfoWindow: function(marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = marker.infoText;
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      }
    },
    name: 'map',

    beforeCreate() {
      let currentCoordinate = { x: 41.6446231, y: -0.896913 }

      let siteData = { name: "A site", coordinate: {x: 41.6449231, y: -0.899913} }
      sendRegisterASite(siteData).then((response) => {
        console.log("Added site", response.body.result)
      })

      let closestSites = []
      sendGetClosest(currentCoordinate).then((response) => {
        closestSites = response.body.result
        closestSites = closestSites.map( site => {
          return {
            position: {lat: site.coordinate.x, lng: site.coordinate.y},
            infoText: site.name
          }
        })
        this.center = { lat: currentCoordinate.x, lng: currentCoordinate.y }
        this.markers = closestSites
      })
    }
  }
</script>
