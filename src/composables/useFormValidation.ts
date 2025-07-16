import type { Ref } from 'vue';
import type { IAuthInterface, FormErrors } from 'src/types';
import { useFormStore } from 'src/stores/useFormStore';

export function useFormValidation(formFields: Ref<IAuthInterface>, errors: Ref<FormErrors>) {
  const formStore = useFormStore();

  function validateName(field: IAuthInterface): void {
    const error = field.name.length < 3 ? 'Имя должно быть не менее 3 символов' : '';
    errors.value.nameError = error;

    if (field.name.length >= 3) {
      formStore.setTouchedField('name', false);
    }
  }

  function validatePassword(field: IAuthInterface): void {
    const error = field.password.length < 6 ? 'Пароль должен быть не менее 6 символов' : '';
    errors.value.passwordError = error;

    if (!error) {
      formStore.setTouchedField('password', false);
    }
  }

  function validateConfirmPassword(field: IAuthInterface): void {
    let error = '';
    if (field.confirmPassword.length < 6) {
      error = 'Подтверждение пароля должно быть не менее 6 символов';
    } else if (field.password !== field.confirmPassword) {
      error = 'Пароли не совпадают';
    }
    errors.value.confirmPasswordError = error;

    if (!error) {
      formStore.setTouchedField('confirmPassword', false);
    }
  }

  function validateEmail(field: IAuthInterface): void {
    const error = field.email.length < 5 ? 'Email должен быть не менее 5 символов' : '';
    errors.value.emailError = error;

    if (!error) {
      formStore.setTouchedField('email', false);
    }
  }

  const validators = {
    name: validateName,
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    email: validateEmail,
  };

  type FieldKey = keyof IAuthInterface;

  function validateField(field: FieldKey) {
    const validator = validators[field];
    if (validator) {
      validator(formFields.value);
    }
  }

  function handleBlur(field: keyof IAuthInterface) {
    validateField(field);
    const errorKey = `${field}Error` as keyof FormErrors;
    const hasError = Boolean(errors.value[errorKey]);
    formStore.setTouchedField(field, hasError);
  }

  return {
    validateField,
    handleBlur,
    validateName,
    validatePassword,
    validateConfirmPassword,
    validateEmail,
  };
}
