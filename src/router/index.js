import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingPage from '../views/LandingPage.vue'
import ChatComponent from '../views/ChatComponent.vue'
import PostComponent from '../components/PostComponent.vue'

const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/landing' // Umleitung von der Hauptseite zur Landing Page
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatComponent
    },
    {
      path: '/posts',
      name: 'Posts',
      component: PostComponent
    },
    {
      path: '/:pathMatch(.*)*', // Fängt alle undefinierten Routen ab
      redirect: '/landing' // Leitet um zur Landing Page
    }
  ]
})

export default router
