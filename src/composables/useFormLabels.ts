import type { FormType } from 'src/types';
import type { Ref } from 'vue';
import { computed } from 'vue';

export function useFormLabels(activeForm: Ref<FormType>) {
  const formTitle = computed(() => {
    if (activeForm.value === 'login') return 'Вход';
    if (activeForm.value === 'register') return 'Регистрация';
    if (activeForm.value === 'forgot') return 'Восстановление пароля';
    return '';
  });

  const submitButtonLabel = computed(() => {
    if (activeForm.value === 'login') return 'Войти';
    if (activeForm.value === 'register') return 'Зарегистрироваться';
    if (activeForm.value === 'forgot') return 'Восстановить пароль';
    return '';
  });

  return {
    formTitle,
    submitButtonLabel,
  };
}
