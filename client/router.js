import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from '@/pages/welcome'
import HomePage from '@/pages/home/home'
import OrganisationPage from '@/pages/home/organisation'
import AlbumPage from '@/pages/home/album'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: WelcomePage,
      },
      {
        path: '/home',
        component: HomePage,
      },
      {
        path: '/home/organisations/:org_id',
        component: OrganisationPage,
      },
      {
        path: '/home/organisations/:org_id/albums/:alb_id',
        component: AlbumPage,
      },
    ],
  })
}
