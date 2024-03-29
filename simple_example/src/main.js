import '@/assets/css/Cmp.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/MenuNav'

createApp(App).use(router).mount('#app')
