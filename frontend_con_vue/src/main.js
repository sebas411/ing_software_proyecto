import Vue from 'vue'
import App from './App.vue'
import store  from './store'
import DatePicker from './components/DatePicker.vue'


Vue.config.productionTip = false
Vue.component('date-picker',DatePicker)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
