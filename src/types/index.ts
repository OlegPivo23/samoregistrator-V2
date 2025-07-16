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

export interface TouchedFields {
  name: boolean;
  password: boolean;
  confirmPassword: boolean;
  email: boolean;
}

export type FormType = 'login' | 'register' | 'forgot';

export interface FormFieldConfig {
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

export interface FormButtonConfig {
  label: string;
  targetForm: FormType;
}

export interface FormConfig {
  title: string;
  fields: FormFieldConfig[];
  buttons: FormButtonConfig[];
}
