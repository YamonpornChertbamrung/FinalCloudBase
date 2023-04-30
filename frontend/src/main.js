import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bulma/css/bulma.css'

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import "bootstrap-icons/font/bootstrap-icons.css"

import 'bootstrap-vue/dist/bootstrap-vue.css'

library.add(fas)

Vue.component('icon', FontAwesomeIcon)
Vue.config.productionTip = false

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

import VSwitch from 'v-switch-case'
 
Vue.use(VSwitch)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
