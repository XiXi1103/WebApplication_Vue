import Vue from 'vue'
import VueRouter from 'vue-router'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(VueRouter)
Vue.use(mavonEditor)

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
  },
  {
    path: '/mycreate',
    name: '/Mycreate',
    component: () => import('../views/Mycreate')
  },
  {
    path: '/mycollection',
    name: '/Mycollection',
    component: () => import('../views/Collections')
  },
  {
    path: '/ShowDoc',
    name: '/ShowDoc',
    component: () => import('../views/ShowDoc')
  },
  {
    path: '/groupdoc',
    name: '/GroupDoc',
    component: () => import('../views/GroupDoc')
  },
  {
    path:'/template',
    name:'/Template',
    component: () => import('../views/Template')
  },
  {
    path:'/searchres',
    name:'/Searchres',
    component: () => import('../views/SearchRes')
  }
]

const router = new VueRouter({
  routes
})

export default router
