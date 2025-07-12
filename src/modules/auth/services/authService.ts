import axios from 'axios';

class AuthServiceClass {
  public async accessToken(email: string, password: string) {
    try {
      const payload = { email, password };
      const res = await axios.post('http://localhost:8000/api/token/', payload);

      if (res.status === 200) {
        return res.data;
      }

      return null;
    } catch (error) {
      console.error('Ошибка при входе:', error);
      return null;
    }
  }

  public async refreshAccessToken(refreshToken: string) {
    try {
      const res = await axios.post('http://localhost:8000/api/refresh/', {
        refresh: refreshToken,
      });

      if (res.status === 200) {
        return res.data;
      }

      return null;
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      return null;
    }
  }
}

export default new AuthServiceClass();
