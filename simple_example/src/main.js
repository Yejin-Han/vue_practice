import '@/assets/css/Cmp.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './module/router/MenuNav'
import Axios from 'axios';

createApp(App)
  // 모듈 사용 등록
  .use(router)

  // 전역 설정
  .provide('$Axios', Axios) // provide(key, value): key로 value를 다른 컴포넌트에 전달
  .provide('$Login', 'https://reqres.in/api/login')

  // 연결
  .mount('#app')
