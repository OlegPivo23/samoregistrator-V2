import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/modules/auth/stores/useAuthStore';
import type { Ref } from 'vue';
import type { FormType, IAuthInterface } from 'src/types';

export function useFormActions(formFields: Ref<IAuthInterface>, activeForm: Ref<FormType>) {
  const router = useRouter();
  const $q = useQuasar();
  const authStore = useAuthStore();

  async function handleLogin() {
    const success = await authStore.login(formFields.value.name, formFields.value.password);
    if (success) {
      $q.notify({ message: 'Вы успешно вошли!', type: 'positive' });
      await router.push('/cabinet');
    } else {
      $q.notify({ message: 'Ошибка авторизации', type: 'negative' });
    }
  }

  async function handleRegister() {
    $q.notify({ message: 'Регистрация успешна', type: 'positive' });
    await router.push('/cabinet');
  }

  function handleForgotPassword() {
    $q.notify({ message: 'Инструкция отправлена на email', type: 'info' });
  }

  async function handleSubmit() {
    if (activeForm.value === 'login') return handleLogin();
    if (activeForm.value === 'register') return handleRegister();
    if (activeForm.value === 'forgot') return handleForgotPassword();
  }

  return {
    handleSubmit,
  };
}
