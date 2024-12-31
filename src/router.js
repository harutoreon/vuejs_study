import { createMemoryHistory, createRouter } from "vue-router"

import Home from './Home.vue'
import About from './About.vue'
import User from './User.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/user/:username', name: 'profile', component: User }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
