import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import store from './store'

// import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.component('font-awesome-iconn', FontAwesomeIcon)
app.mount('#app')
