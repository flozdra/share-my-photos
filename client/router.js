import Vue from 'vue'
import Router from 'vue-router'

import WelcomePage from '@/pages/welcome'
import HomePage from '@/pages/home/home'
import OrganisationPage from '@/pages/home/organisation'
import AlbumPage from '@/pages/home/album'
import PhotoPage from '@/pages/home/photo'
import SlideshowPage from '@/pages/home/slideshow'
import LookupPage from '@/pages/home/lookup'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: WelcomePage,
        name: 'welcome-page',
      },
      {
        path: '/home',
        component: HomePage,
        name: 'home-page',
      },
      {
        path: '/home/organisations/:org_id',
        component: OrganisationPage,
        name: 'organisation-page',
      },
      {
        path: '/home/organisations/:org_id/albums/:alb_id',
        component: AlbumPage,
        name: 'album-page',
      },
      {
        path: '/home/organisations/:org_id/albums/:alb_id/photos/:photo_id',
        component: PhotoPage,
        name: 'photo-page',
      },
      {
        path: '/home/organisations/:org_id/albums/:alb_id/slideshow',
        component: SlideshowPage,
        name: 'slideshow-page',
      },
      {
        path: '/home/lookup/:search',
        component: LookupPage,
        name: 'lookup-page',
      },
    ],
  })
}
