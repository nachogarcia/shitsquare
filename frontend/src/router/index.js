import Vue from 'vue'
import Router from 'vue-router'
import Map from '@/components/Map'
import Site from '@/components/Site'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Map
    },
    {
      path: '/site',
      component: Site,
    }
  ]
})
