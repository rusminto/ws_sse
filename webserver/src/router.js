import Vue from 'vue'
import Router from 'vue-router'
import sse from './views/Sse.vue'
import websocket from './views/Ws.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/ws',
	  name: 'websocket',
	  component: websocket
	},
	{
		path: '/http/:type',
		name: 'sse',
		component: sse
	},
	{
		path: '/',
		name: 'dashboard',
		component: Dashboard
	}
  ]
})
