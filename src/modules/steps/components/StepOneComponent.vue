<script setup lang="ts">
import NoDataComponent from 'src/components/no-data/NoDataComponent.vue';
import QuestionComponent from 'src/modules/questions/components/QuestionComponent.vue';
import { useQuestionStore } from 'src/modules/questions/stores/useQuestionStore';
import { computed, onMounted } from 'vue';

const questionsStore = useQuestionStore();

const questions = computed(() => questionsStore.getAllQuestions);
const firstQuestion = questions.value[0];
onMounted(async () => {
  try {
    await questionsStore.fetchAllQuestions();
  } catch (error) {
    console.error('Ошибка загрузки вопросов:', error);
  }
});
</script>

<template>
  <template v-if="!questions.length">
    <NoDataComponent title="Пока что тут пусто :(" description="Совсем скоро опросники появятся" />
  </template>
  <template v-else>
    <QuestionComponent v-if="firstQuestion" :questions="[firstQuestion]" />
  </template>
</template>
