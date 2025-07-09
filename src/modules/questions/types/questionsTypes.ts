export interface Answer {
  id: number;
  body: string;
}

export interface Question {
  id: number;
  body: string;
  note?: string;
  question_type: 'ONE_O' | 'MUL_O';
  answers: Answer[];
}

export interface Form {
  id?: number;
  title: string;
  note?: string | undefined;
  questions: Question[];
}

export interface QuestionDetail {
  id: number;
  title: string;
  note?: string;
  questions: Question[];
}
