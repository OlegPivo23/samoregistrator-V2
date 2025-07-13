<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const stepId = Number(route.params.id);

async function goToNextStep() {
  const nextStep = stepId + 1;
  await router.push(`/steps/${nextStep}`);
}
</script>

<template>
  <div>
    <h2>Шаг {{ stepId }}</h2>
    <button @click="goToNextStep">Далее</button>
  </div>
</template>
