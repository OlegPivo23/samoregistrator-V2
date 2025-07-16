<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import MainLayout from 'src/layouts/MainLayout.vue';
import StepOneComponent from '../components/StepOneComponent.vue';
import StepTwoComponent from '../components/StepTwoComponent.vue';
import StepThreeComponent from '../components/StepThreeComponent.vue';
import StepFourComponent from '../components/StepFourComponent.vue';
import StepFiveComponent from '../components/StepFiveComponent.vue';
import StepSixComponent from '../components/StepSixComponent.vue';
import { useDriver } from 'src/composables/useDrive';

const router = useRouter();
const route = useRoute();
const { startEducation } = useDriver();

const steps = [
  { id: 1, title: 'Шаг 1: Личная информация', component: StepOneComponent, path: 'step-1' },
  { id: 2, title: 'Шаг 2: Документы', component: StepTwoComponent, path: 'step-2' },
  { id: 3, title: 'Шаг 3: Подтверждение', component: StepThreeComponent, path: 'step-3' },
  {
    id: 4,
    title: 'Шаг 4: Подготовка технических документов',
    component: StepFourComponent,
    path: 'step-4',
  },
  { id: 5, title: 'Шаг 5: Сайт', component: StepFiveComponent, path: 'step-5' },
  { id: 6, title: 'Шаг 6: Юридическая часть', component: StepSixComponent, path: 'step-6' },
];

const currentStep = ref<number>(1);

watch(
  () => route.params.stepId,
  (newStep) => {
    const stepId = parseInt(newStep as string);
    if (!isNaN(stepId)) {
      currentStep.value = stepId;
    }
  },
  { immediate: true },
);

async function goToStep(stepId: number) {
  const step = steps.find((s) => s.id === stepId);
  if (step) {
    await router.push(`/steps/${step.path}`);
  }
}

watch(
  () => route.path,
  (path) => {
    const match = steps.find((step) => path.includes(step.path));
    if (match) currentStep.value = match.id;
  },
  { immediate: true },
);
</script>
<template>
  <MainLayout>
    <div class="max-w-[1920px] px-4 mx-auto mt-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold mb-6">Все шаги</h1>
        <q-btn id="btn" label="Обучение" @click="startEducation" />
      </div>

      <div class="step-navigation">
        <div
          v-for="step in steps"
          :key="step.id"
          class="step"
          :class="{
            'step-done': currentStep > step.id,
            'step-active': currentStep === step.id,
            'step-clickable': true,
          }"
          @click="goToStep(step.id)"
        >
          <span class="step-number">{{ step.id }}</span>
          <span class="step-title">{{ step.title }}</span>
        </div>
      </div>

      <router-view />
    </div>
  </MainLayout>
</template>

<style scoped>
.step-navigation {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
}

.step-navigation::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #ccc;
  transform: translateY(-50%);
  z-index: 0;
}

.step {
  position: relative;
  z-index: 1;
  text-align: center;
  background-color: white;
  padding: 8px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.step-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: #e0e0e0;
  color: white;
  font-weight: bold;
  margin-bottom: 4px;
}

.step-done .step-number {
  background-color: #4caf50;
}

.step-active .step-number {
  background-color: #1976d2;
}

.step-title {
  display: block;
  font-size: 14px;
  margin-top: 4px;
}
</style>
