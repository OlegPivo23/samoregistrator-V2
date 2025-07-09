import type { Form, QuestionDetail } from '../types/questionsTypes';

export const mapToForm = (questionDetail: QuestionDetail | null): Form | null => {
  if (!questionDetail) return null;

  return {
    id: questionDetail.id,
    title: questionDetail.title,
    note: questionDetail.note ?? undefined, // безопасное преобразование
    questions: questionDetail.questions,
  };
};
