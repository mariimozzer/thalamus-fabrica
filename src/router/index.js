import { createRouter, createWebHashHistory } from 'vue-router'
import PortfolioView from '../views/PortfolioView.vue'

const routes = [
  {
    path: '/',
    name: 'PortfolioComponent',
    component: PortfolioView
  },
 
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
