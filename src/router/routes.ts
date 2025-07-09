import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/modules/auth/pages/AuthPage.vue'),
  },
  {
    path: '/cabinet',
    component: () => import('src/modules/cabinet/pages/CabinetPage.vue'),
  },
  {
    path: '/questions',
    component: () => import('src/modules/questions/pages/QuestionsPage.vue'),
  },
  {
    path: '/question/:id',
    component: () => import('src/modules/questions/pages/QuestionPage.vue'),
    props: true,
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/not-found/pages/NotFoundPage.vue'),
  },
];

export default routes;
