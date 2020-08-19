import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import utils from './javascript/utils.js'
Vue.use(utils);

Vue.use(VueAxios,axios);
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

Vue.config.productionTip = false;
 //Vue.prototype.requestUrl = "http://rap2.taobao.org:38080/app/mock/262266";
Vue.prototype.requestUrl = "http://localhost:8083";
Vue.prototype.baseUrl = "http://localhost:8080/#/";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
