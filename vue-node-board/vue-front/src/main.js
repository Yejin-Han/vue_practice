import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import vuetify from './plugins/vuetify'

import './assets/common.css'

const app = createApp(App)

app
  .use(router)
  .use(vuetify)
  .mount('#app')
