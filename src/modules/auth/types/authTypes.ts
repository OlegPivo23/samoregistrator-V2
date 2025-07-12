export interface BaseAuth {
  email: string;
  password: string;
}
export interface AuthWithConfirm extends BaseAuth {
  confirmPassword: string;
  email: string;
}

export interface AuthRecovery {
  email: string;
}

export interface FormErrors {
  nameError: string;
  passwordError: string;
  confirmPasswordError: string;
  emailError: string;
}

export type FormType = 'login' | 'register' | 'forgot';
