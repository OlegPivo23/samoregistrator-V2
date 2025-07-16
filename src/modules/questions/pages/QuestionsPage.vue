<script setup lang="ts">
import MainLayout from 'src/layouts/MainLayout.vue';
import { useQuestionStore } from '../stores/useQuestionStore';
import { computed, onMounted } from 'vue';
import { QSpinnerDots } from 'quasar';
import QuestionComponent from '../components/QuestionComponent.vue';
import NoDataComponent from 'src/components/no-data/NoDataComponent.vue';

const questionsStore = useQuestionStore();

const questions = computed(() => questionsStore.getAllQuestions);

onMounted(async () => {
  try {
    await questionsStore.fetchAllQuestions();
  } catch (error) {
    console.error('Ошибка загрузки вопросов:', error);
  }
});
</script>

<template>
  <MainLayout>
    <div class="flex flex-col gap-4 p-6 max-w-[1920px] px-4 mx-auto">
      <q-spinner-dots v-if="questionsStore.loading" color="primary" size="50px" />
      <div v-else-if="!questions.length">
        <NoDataComponent
          title="Пока что тут пусто :("
          description="Совсем скоро опросники появятся"
        />
      </div>
      <QuestionComponent v-else :questions="questions" />
    </div>
  </MainLayout>
</template>
