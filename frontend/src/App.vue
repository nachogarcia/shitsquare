<template>
  <div id="app">
    <app-nav></app-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNav from './components/AppNav.vue'
export default {
  name: 'app',
  components: {AppNav}
}
</script>
<style>
html, body, #app {
  height: 100%;
  width: 100%;
}
</style>
