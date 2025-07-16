// useForm.ts
import type { ComputedRef, Ref } from 'vue';
import { computed } from 'vue';
import { useFormState } from './useFormState';
import { useFormValidation } from './useFormValidation';
import { useFormActions } from './useFormActions';
import { useFormLabels } from './useFormLabels';
import type { FormConfig, FormErrors, FormType, IAuthInterface } from 'src/types';

export interface UseFormReturn {
  formFields: Ref<IAuthInterface>;
  errors: Ref<FormErrors>;
  activeForm: Ref<FormType>;
  currentFormConfig: ComputedRef<FormConfig>;
  formTitle: ComputedRef<string>;
  submitButtonLabel: ComputedRef<string>;
  isValid: ComputedRef<boolean>;
  handleSubmit: () => Promise<void>;
  handleBlur: (field: keyof IAuthInterface) => void;
  switchForm: (formName: FormType) => void;
}

export function useForm(initialForm: FormType = 'login'): UseFormReturn {
  // 1. Состояние формы
  const { formFields, errors, activeForm, currentFormConfig } = useFormState(initialForm);

  // 2. Валидация
  const { validateField, handleBlur } = useFormValidation(formFields, errors);

  // 3. Действия (отправка, нотификации, роутинг)
  const { handleSubmit } = useFormActions(formFields, activeForm);

  // 4. Подписи и метки
  const { formTitle, submitButtonLabel } = useFormLabels(activeForm);

  // 5. Валидация всей формы
  function switchForm(formName: FormType) {
    activeForm.value = formName;
  }

  const isValid = computed(() => {
    if (activeForm.value === 'login') {
      validateField('name');
      validateField('password');
      return formFields.value.name.length >= 3 && formFields.value.password.length >= 6;
    }

    if (activeForm.value === 'register') {
      console.log('reg');

      validateField('name');
      validateField('password');
      validateField('confirmPassword');
      return (
        formFields.value.name.length >= 3 &&
        formFields.value.password.length >= 6 &&
        formFields.value.confirmPassword.length >= 6 &&
        formFields.value.password === formFields.value.confirmPassword
      );
    }

    if (activeForm.value === 'forgot') {
      validateField('email');
      return formFields.value.email.length >= 5;
    }

    return false;
  });

  return {
    // состояние
    formFields,
    errors,
    currentFormConfig,

    // действия
    handleSubmit,
    switchForm, // или передавать отдельно

    // интерфейс
    formTitle,
    submitButtonLabel,
    isValid,

    // внутреннее
    handleBlur,
    activeForm,
  };
}
