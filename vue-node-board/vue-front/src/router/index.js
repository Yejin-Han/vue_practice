import { createRouter, createWebHistory } from 'vue-router';

import MainPage from '@/pages/MainPage.vue';
import BoardPage from '@/pages/BoardPage.vue';
import WritePage from '@/pages/WritePage.vue';
import ContentPage from '@/pages/ContentPage.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/board/:id', component: BoardPage },
  { path: '/board/:id/write', component: WritePage },
  { path: '/board/:id/content', component: ContentPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;