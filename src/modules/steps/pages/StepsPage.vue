<script setup lang="ts">
import { ref, computed } from 'vue';
import MainLayout from 'src/layouts/MainLayout.vue';
import StepOneComponent from '../components/StepOneComponent.vue';
import StepTwoComponent from '../components/StepTwoComponent.vue';
import StepThreeComponent from '../components/StepThreeComponent.vue';
import { useDriver } from 'src/composables/useDrive';
import StepFourComponent from '../components/StepFourComponent.vue';
import StepFiveComponent from '../components/StepFiveComponent.vue';
import StepSixComponent from '../components/StepSixComponent.vue';

const { startEducation } = useDriver();

const currentStep = ref(1);

const steps = [
  { id: 1, title: 'Шаг 1: Личная информация', component: StepOneComponent },
  { id: 2, title: 'Шаг 2: Документы', component: StepTwoComponent },
  { id: 3, title: 'Шаг 3: Подтверждение', component: StepThreeComponent },
  { id: 4, title: 'Шаг 4: Подготовка технических документов', component: StepFourComponent },
  { id: 5, title: 'Шаг 5: Сайт', component: StepFiveComponent },
  { id: 6, title: 'Шаг 6: Юридическая часть', component: StepSixComponent },
];

const currentComponent = computed(() => {
  const step = steps.find((s) => s.id === currentStep.value);
  return step?.component || null;
});

function nextStep() {
  if (currentStep.value < steps.length) {
    currentStep.value += 1;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
}
</script>

<template>
  <MainLayout>
    <div class="max-w-[1200px] mx-auto mt-4">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold mb-6">Все шаги</h1>
        <q-btn id="btn" label="Обучение" @click="startEducation" />
      </div>
      <q-stepper id="stepper" v-model="currentStep" color="primary" animated flat>
        <q-step
          v-for="step in steps"
          :key="step.id"
          :name="step.id"
          :title="step.title"
          :id="`step-${step.id}`"
          :done="currentStep > step.id"
          @click="currentStep = step.id"
        >
        </q-step>
      </q-stepper>

      <div>
        <KeepAlive>
          <component :is="currentComponent" />
        </KeepAlive>
      </div>

      <div class="mt-6 flex justify-between">
        <q-btn
          label="Назад"
          color="primary"
          outline
          :disable="currentStep === 1"
          @click="prevStep"
        />
        <q-btn
          label="Далее"
          color="primary"
          :disable="currentStep === steps.length"
          @click="nextStep"
        />
      </div>
    </div>
  </MainLayout>
</template>
