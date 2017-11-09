// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import filter from './util/filter'


Vue.use(ElementUI)
Vue.use(MintUI)
import { Indicator } from 'mint-ui';
import { Toast } from 'mint-ui';
axios.defaults.timeout = 30000;
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
// http request 拦截器
axios.interceptors.request.use(
    config => {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      return config;

    },
    err => {
      Indicator.close();
      Toast({
        message: '加载超时',
        position: 'middle',
        duration: 3000
      });
      return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
      let timetp = null;
      clearTimeout(timetp);
      timetp = setTimeout(()=>{
        Indicator.close();
        clearTimeout(timetp);
      },200)
      // Indicator.close();
      return response;
    },
    error => {
      if (error.response) {
        return Promise.reject(error)
    }
});



Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
