export interface IAuthInterface {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface FormErrors {
  nameError: string;
  passwordError: string;
  confirmPasswordError: string;
  emailError: string;
}

export type FormType = 'login' | 'register' | 'forgot';
