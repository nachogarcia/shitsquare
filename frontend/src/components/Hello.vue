<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getClosest">Recargar</button>
    <button @click="registerASite">Registrar sitio</button>
    <button @click="addReview">Añadir Review</button>
  </div>
</template>

<script>
import { sendRegisterASite, sendGetClosest, sendAddReview } from "../actions.js"

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Sites'
    }
  },
  methods: {
    getClosest () {
      let self = this
      let coordinate = {x: 0, y: 0}

      sendGetClosest(coordinate).then((response) => {
        self.msg = response.body.result
      })
    },

    registerASite () {
      let siteData = { id: "A site", coordinate: {x: 0, y: 0} }

      sendRegisterASite(siteData).then((response) => {
        console.log("Added site", response.body.result)
      })
    },

    addReview () {
      let siteData = { id: "A site", coordinate: {x: 0, y: 0} }
      let reviewData = { }

      sendAddReview(siteData, reviewData).then((response) => {
        console.log("Added Review", response.body.result)
      })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
