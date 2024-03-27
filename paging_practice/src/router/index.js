import { createRouter, createWebHistory } from 'vue-router';
import PageHome from '@/views/PageHome.vue';
import PageContact from '@/views/PageContact.vue';

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/about',
    name: 'PageAbout',
    component: () => import('@/views/PageAbout.vue') // 비동기 로드
  },
  {
    path: '/contact',
    name: 'PageContact',
    component: PageContact
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;