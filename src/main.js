import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http=axios

// Vue.prototype.$http.defaults.baseURL = '' //访问时$http.get("").then((res)=>{})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
