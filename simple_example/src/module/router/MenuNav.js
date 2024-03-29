import { createRouter, createWebHistory } from 'vue-router';

import IfTestCmp from '@/components/test/IfTestCmp.vue';
import ForTestCmp from '@/components/test/ForTestCmp.vue';
import CompositionTestCmp from '@/components/test/CompositionTestCmp.vue';
import APICallTestCmp from '@/components/test/APICallTestCmp.vue';

const routes = [
  { path: '/1', component: IfTestCmp },
  { path: '/2', component: ForTestCmp },
  { path: '/3', component: CompositionTestCmp },
  { path: '/4', component: APICallTestCmp },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export { router }