import { formConfigurations } from 'src/configs/formConfig';
import type { FormConfig, FormErrors, FormType, IAuthInterface } from 'src/types';

import { computed, ref } from 'vue';

export function useFormState(initialForm: FormType = 'login') {
  const activeForm = ref<FormType>(initialForm);
  const formFields = ref<IAuthInterface>({
    name: '',
    password: '',
    confirmPassword: '',
    email: '',
  });

  const errors = ref<FormErrors>({
    nameError: '',
    passwordError: '',
    confirmPasswordError: '',
    emailError: '',
  });

  const currentFormConfig = computed<FormConfig>(() => {
    return formConfigurations[activeForm.value];
  });

  return {
    activeForm,
    formFields,
    errors,
    currentFormConfig,
  };
}
