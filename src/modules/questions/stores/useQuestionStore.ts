import { defineStore } from 'pinia';
import type { AxiosResponse } from 'axios';
import questionsServices from '../services/questionsServices';

// ===== Типы =====

interface Answer {
  id: number;
  body: string;
}

interface Question {
  id: number;
  body: string;
  note?: string;
  question_type: 'ONE_O' | 'MUL_O';
  answers: Answer[];
}

interface QuestionDetail {
  id: number;
  title: string;
  note?: string;
  questions: Question[];
}

// ===== Store =====

export const useQuestionStore = defineStore('questionStore', {
  state: () => ({
    questions: [] as Question[],
    cashedQuestions: [] as Question[],
    question: null as QuestionDetail | null,
    error: null as string | null,
    loading: false as boolean,
  }),

  getters: {
    getAllQuestions(state): Question[] {
      return state.questions;
    },

    getQuestion(state): QuestionDetail | null {
      return state.question;
    },
  },

  actions: {
    async fetchAllQuestions() {
      if (this.cashedQuestions.length > 0) {
        this.questions = this.cashedQuestions;
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const res = await questionsServices.getQuestionsService();

        if (res && res.data) {
          this.questions = res.data;
          this.cashedQuestions = [...res.data];
        }
      } catch (e) {
        this.error = 'Ошибка загрузки вопросов';
        console.error(e);
      } finally {
        this.loading = false;
      }
    },

    async fetchQuestionDetails(questionId: number) {
      this.loading = true;
      this.error = null;

      try {
        const res: AxiosResponse | undefined =
          await questionsServices.fetchQuestionDetailsService(questionId);

        if (res && res.data) {
          this.question = res.data;
        }
      } catch (e) {
        this.error = 'Ошибка загрузки деталей вопроса';
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
});
