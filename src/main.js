import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import { hasBtnPermission } from './utils/permission' // button permission
// 引入echarts
import Echarts from 'vue-echarts'
import 'echarts'
import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)
Vue.component('ECharts', Echarts)
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.prototype.hasPerm = hasBtnPermission

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
