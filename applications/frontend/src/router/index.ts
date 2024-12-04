// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, createWebHistory } from 'vue-router';
import { defineAsyncComponent } from 'vue';

// Асинхронная загрузка компонентов
const EstatesPage = defineAsyncComponent(
  () => import('../pages/EstatesPage.vue')
);

const routes = [
  {
    path: '/', // Страница со списком объектов
    component: EstatesPage, // Используем тот же компонент для отображения
    name: 'Home',
  },
  {
    path: '/estates', // Страница со списком объектов
    component: EstatesPage, // Используем тот же компонент для отображения
    name: 'EstatesPageRoute',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

