import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import mqtt from 'vue-mqtt';
import './registerServiceWorker'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://localhost:1337', { store: store })

Vue.config.productionTip = false
// Vue.use(mqtt, 'ws://6e989e90.ngrok.io', {clientId: 'WebClient-' + parseInt(Math.random() * 100000)});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
