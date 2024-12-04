// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

// Асинхронная загрузка компонентов
const EstatesPage = defineAsyncComponent(
  () => import('../pages/EstatesPage/EstatesPage.vue')
);

const routes = [
  {
    path: '/',
    component: EstatesPage,
    name: 'Home',
  },
  {
    path: '/estates',
    component: EstatesPage,
    name: 'EstatesPageRoute',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
