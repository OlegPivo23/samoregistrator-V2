import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formConfigurations } from 'src/configs/formConfig';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/modules/auth/stores/useAuthStore';

const authStore = useAuthStore();

// Типы для данных формы
export interface IAuthInterface {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface FormErrors {
  nameError: string;
  passwordError: string;
  confirmPasswordError: string;
  emailError: string;
}

interface TouchedFields {
  name: boolean;
  password: boolean;
  confirmPassword: boolean;
  email: boolean;
}

type FormType = 'login' | 'register' | 'forgot';

interface FormFieldConfig {
  model: keyof IAuthInterface;
  label: string;
  type:
    | 'number'
    | 'password'
    | 'email'
    | 'text'
    | 'textarea'
    | 'search'
    | 'tel'
    | 'file'
    | 'url'
    | 'time'
    | 'date'
    | 'datetime-local'
    | undefined;
  error: keyof FormErrors;
}

interface FormButtonConfig {
  label: string;
  targetForm: FormType;
}

export interface FormConfig {
  title: string;
  fields: FormFieldConfig[];
  buttons: FormButtonConfig[];
}

export function useForm(initialForm: FormType = 'login') {
  const router = useRouter();
  const $q = useQuasar();

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

  const touched = ref<TouchedFields>({
    name: false,
    password: false,
    confirmPassword: false,
    email: false,
  });

  const currentFormConfig = computed<FormConfig>(() => {
    return formConfigurations[activeForm.value];
  });

  function validateField(field: keyof IAuthInterface) {
    switch (field) {
      case 'name':
        errors.value.nameError =
          formFields.value.name.length < 3 ? 'Имя должно быть не менее 3 символов' : '';
        break;

      case 'password':
        errors.value.passwordError =
          formFields.value.password.length < 6 ? 'Пароль должен быть не менее 6 символов' : '';
        break;

      case 'confirmPassword':
        errors.value.confirmPasswordError =
          formFields.value.confirmPassword.length < 6
            ? 'Подтверждение пароля должно быть не менее 6 символов'
            : formFields.value.password !== formFields.value.confirmPassword
              ? 'Пароли не совпадают'
              : '';
        break;

      case 'email':
        errors.value.emailError =
          formFields.value.email.length < 5 ? 'Email должен быть не менее 5 символов' : '';
        break;
    }
  }

  function handleBlur(field: keyof IAuthInterface) {
    touched.value[field] = true;
    validateField(field);
  }

  const isValid = computed(() => {
    if (activeForm.value === 'login') {
      validateField('name');
      validateField('password');
      return formFields.value.name.length >= 3 && formFields.value.password.length >= 6;
    }

    if (activeForm.value === 'register') {
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

  const formTitle = computed(() => currentFormConfig.value.title);

  const submitButtonLabel = computed(() => {
    if (activeForm.value === 'login') return 'Войти';
    if (activeForm.value === 'register') return 'Зарегистрироваться';
    return 'Восстановить пароль';
  });

  async function handleSubmit() {
    if (!isValid.value) {
      return;
    }

    if (activeForm.value === 'login') {
      const success = await authStore.login(formFields.value.name, formFields.value.password);
      if (success) {
        $q.notify({
          message: 'Вы удачно вошли в систему!',
          type: 'positive',
          position: 'bottom-right',
        });
        await router.push('/cabinet');
      } else {
        $q.notify({
          message: 'Ошибка авторизации! Неверный логин и/ или пароль',
          type: 'negative',
          position: 'bottom-right',
        });
      }
    } else if (activeForm.value === 'register') {
      $q.notify({
        message: 'Вы успешно зарегестрировались!',
        type: 'positive',
        position: 'bottom-right',
      });
      await router.push('/cabinet');
    } else if (activeForm.value === 'forgot') {
      $q.notify({
        message: 'Инструкция по восстановлению пароля отправлена на ваш email!',
        type: 'info',
        position: 'bottom-right',
      });
    }
  }

  function switchForm(formName: FormType) {
    activeForm.value = formName;
  }

  return {
    activeForm,
    formFields,
    errors,
    currentFormConfig,
    formTitle,
    submitButtonLabel,
    isValid,
    handleSubmit,
    switchForm,
    handleBlur,
    touched,
  };
}
