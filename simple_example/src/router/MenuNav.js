import { createRouter, createWebHistory } from 'vue-router';

import IfTestCmp from '@/components/test/IfTestCmp.vue';
import ForTestCmp from '@/components/test/ForTestCmp.vue';
import CompositionTestCmp from '@/components/test/CompositionTestCmp.vue';

const routes = [
  { path: '/1', component: IfTestCmp },
  { path: '/2', component: ForTestCmp },
  { path: '/3', component: CompositionTestCmp },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router }