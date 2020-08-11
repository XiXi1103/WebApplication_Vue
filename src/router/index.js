import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/homepage',
  },
  {
    path: '/register',
    name:'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name:'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/homepage',
    name: '/Homepage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/markdown',
    name: '/MarkDown',
    component: () => import('../views/Markdown.vue')
  },
  {
    path: '/personalinfo',
    name: '/PersonalInfo',
    component: () => import('../views/PersonalInfo.vue')
  },
  {
    path: '/groupspace',
    name: '/Groupspace',
    component: () => import('../views/GroupSpace')
  },
  {
    path: '/recyclebin',
    name: '/Recyclebin',
    component: () => import('../views/RecycleBin')
  }

]

const router = new VueRouter({
  routes
})

export default router
