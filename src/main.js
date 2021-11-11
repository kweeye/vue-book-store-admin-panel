import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import './registerServiceWorker'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import './assets/number-to-myanmar.js'
import './assets/word-to-myanmar.js'
import { Printd } from 'printd'
import excel from 'vue-excel-export'
import VueQrcodeReader from "vue-qrcode-reader"
 
Vue.use(excel)
Vue.use(VueQrcodeReader)
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)

let user = JSON.parse(window.localStorage.getItem('user'))
if(user){
  Vue.prototype.$role = user.role
}


new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
