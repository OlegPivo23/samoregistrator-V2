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
    path: '/steps',
    component: () => import('src/modules/steps/pages/StepsPage.vue'),
    children: [
      {
        path: 'step-1',
        name: 'Step1',
        component: () => import('../modules/steps/components/StepOneComponent.vue'),
      },
      {
        path: 'step-2',
        name: 'Step2',
        component: () => import('../modules/steps/components/StepTwoComponent.vue'),
      },
      {
        path: 'step-3',
        name: 'Step3',
        component: () => import('../modules/steps/components/StepThreeComponent.vue'),
      },
      {
        path: 'step-4',
        name: 'Step4',
        component: () => import('../modules/steps/components/StepFourComponent.vue'),
      },
      {
        path: 'step-5',
        name: 'Step5',
        component: () => import('../modules/steps/components/StepFiveComponent.vue'),
      },
      {
        path: 'step-6',
        name: 'Step6',
        component: () => import('../modules/steps/components/StepSixComponent.vue'),
      },
    ],
  },

  {
    path: '/card/:id',
    name: 'card',
    component: () => import('src/modules/card/pages/CardPage.vue'),
    props: true,
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('src/modules/not-found/pages/NotFoundPage.vue'),
  },
];

export default routes;
