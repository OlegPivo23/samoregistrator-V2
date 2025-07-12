import { defineStore, storeToRefs } from 'pinia';
import authService from '../services/authService';
import Cookies from 'cookies-ts';

const cookies = new Cookies();

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    accessToken: cookies.get('accessToken') || (null as string | null),
    refreshToken: cookies.get('refreshToken') || (null as string | null),
    isAuthenticated: false,
    isLoading: false,
  }),

  actions: {
    async login(email: string, password: string): Promise<boolean> {
      this.isLoading = true;
      try {
        const data = await authService.accessToken(email, password);
        if (data && data.access && data.refresh) {
          this.accessToken = data.access;
          this.refreshToken = data.refresh;
          this.isAuthenticated = true;

          cookies.set('accessToken', data.access);
          cookies.set('refreshToken', data.refresh);

          return true;
        }
        return false;
      } catch (error) {
        console.error('Ошибка при логине:', error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    async refreshTokens(): Promise<boolean> {
      if (!this.refreshToken) {
        return false;
      }

      try {
        const data = await authService.refreshAccessToken(this.refreshToken);
        if (data && data.access) {
          this.accessToken = data.access;
          cookies.set('accessToken', data.access);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Не удалось обновить токен:', error);
        this.logout();
        return false;
      }
    },

    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      cookies.remove('accessToken');
      cookies.remove('refreshToken');
    },
  },
});

export const useAuthStoreRef = storeToRefs(useAuthStore());
