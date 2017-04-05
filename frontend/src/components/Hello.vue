<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="getClosest">Recargar</button>
    <button @click="registerASite">Registrar sitio</button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Sites'
    }
  },
  methods: {
    getClosest () {

      const url = 'http://localhost:8000/api'
      let method = 'getClosest'
      let id = '2'
      let params = { coordinate: {x: 0, y: 0} }

      let body = { method: method, params: params, id: id }

      let fetchData = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      let self = this
      fetch(url, fetchData)
      .then((response) => {
        response.json().then((response) => {
          self.msg = response.body.result
        })
      });
    },

    registerASite () {
      const url = 'http://localhost:8000/api'
      let method = 'registerASite'
      let id = '1'
      let params = { id: "A site", coordinate: {x: 0, y: 0} }

      let body = { method: method, params: params, id: id }

      let fetchData = {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      fetch(url, fetchData)
      .then((response) => {
        response.json().then((response) => {
          console.log("Added site", response.body.result)
        })
      });
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
