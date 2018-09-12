// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'babel-polyfill'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/reset.css'
import './assets/css/com.css'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);
Vue.config.productionTip = false
console.log(__APIHOST__)
// 引入mockjs
/* global __MOCK__:false */
if (__MOCK__) {
  require('./mock/mock.js')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.filter('getYMD', function (input) {
  return input.split(' ')[0]
})
