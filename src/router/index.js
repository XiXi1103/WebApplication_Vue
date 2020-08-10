import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name:'Register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/login',
    name:'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/homepage',
    name: '/Homepage',
    component: () => import('../components/HomePage.vue')
  },
  {
    path: '/markdown',
    name: '/MarkDown',
    component: () => import('../components/Markdown.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
