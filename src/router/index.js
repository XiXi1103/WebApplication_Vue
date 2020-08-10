import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../components/Login";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import Markdown from "../components/Markdown";


Vue.use(mavonEditor)
Vue.use(VueRouter)
Vue.use(ElementUI);

  const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')},
    {path: '/login', name: 'Login', component: Login},
    {path: '/mk', name: 'Markdown', component: Markdown},
]

const router = new VueRouter({
  routes
})

export default router
