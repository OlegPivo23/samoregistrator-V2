import axios from 'axios';

class QuestionServiceClass {
  public async getQuestionsService() {
    try {
      const res = await axios.get('http://45.87.247.139:8000/api/forms/');
      if (res.status === 200) {
        return res.data;
      }
      console.error('Error: Invalid status', res.status);
      return null;
    } catch (e) {
      console.error('Error fetching data:', e);
      return null;
    }
  }

  public async fetchQuestionDetailsService(questionId: number) {
    try {
      const res = await axios.get(`http://45.87.247.139:8000/api/forms/${questionId}/`);
      return res.data;
    } catch (error) {
      console.error('Ошибка при загрузке вопроса:', error);
      return null;
    }
  }
}

export default new QuestionServiceClass();
