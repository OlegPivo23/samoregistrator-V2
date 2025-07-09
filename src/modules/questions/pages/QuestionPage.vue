<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuestionStore } from '../stores/useQuestionStore';
import { QCard, QCardSection, QCardActions, QBtn, QOptionGroup } from 'quasar';
import MainLayout from 'src/layouts/MainLayout.vue';
import type { Form, Question } from '../types/questionsTypes';
import { mapToForm } from '../composables/useMapToForm';

const route = useRoute();
const questionStore = useQuestionStore();

const loading = ref(true);
const form = ref<Form>({
  title: '',
  note: '',
  questions: [],
});
const answers = ref<Record<number, number | number[] | null>>({});

// ===== Инициализация =====

const initAnswers = () => {
  form.value.questions.forEach((question) => {
    answers.value[question.id] = question.question_type === 'MUL_O' ? [] : null;
  });
};

const getOptions = (question: Question) => {
  return question.answers.map((answer) => ({
    label: answer.body,
    value: answer.id,
  }));
};

// ===== Загрузка данных =====

onMounted(async () => {
  const id = Number(route.params.id);
  await questionStore.fetchQuestionDetails(id);
  // form.value = mapToForm(questionStore.question);
  const mappedQuestion = mapToForm(questionStore.question);
  console.log('mappedQuestion', mappedQuestion);

  initAnswers();
  loading.value = false;
});

// ===== Обработка отправки =====

const submitAnswer = () => {
  const formattedAnswers = Object.entries(answers.value).map(([questionId, answerIds]) => ({
    question_id: Number(questionId),
    answer_ids: Array.isArray(answerIds) ? answerIds : [answerIds],
  }));

  console.log('Ответы на форму:', formattedAnswers);
};
</script>

<template>
  <MainLayout>
    <q-card class="mt-6 max-w-[600px] w-full mx-auto">
      <q-card-section v-if="loading">
        <div class="flex justify-center items-center py-12">
          <q-spinner-dots color="primary" size="50px" />
        </div>
      </q-card-section>

      <q-card-section v-else>
        <h1 class="text-h5">{{ form.title }}</h1>
        <p v-if="form.note" class="q-mt-sm text-body2">{{ form.note }}</p>

        <div v-for="question in form.questions" :key="question.id" class="q-mt-md border-b pb-4">
          <h3 class="text-h6">{{ question.body }}</h3>
          <p v-if="question.note" class="text-body2 q-mb-sm">{{ question.note }}</p>

          <q-option-group
            v-if="question.question_type === 'ONE_O'"
            :options="getOptions(question)"
            type="radio"
            v-model="answers[question.id]"
            class="q-mt-sm"
          />

          <q-option-group
            v-else-if="question.question_type === 'MUL_O'"
            :options="getOptions(question)"
            type="checkbox"
            v-model="answers[question.id]"
            class="q-mt-sm"
          />
        </div>

        <q-card-actions align="right" class="q-mt-xl">
          <q-btn label="Отправить" color="primary" @click="submitAnswer" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </MainLayout>
</template>
