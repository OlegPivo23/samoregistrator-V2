// stores/useFormStore.ts
import { defineStore } from 'pinia';
import type { TouchedFields } from 'src/types';

export const useFormStore = defineStore('formStore', {
  state: (): { touched: TouchedFields } => ({
    touched: {
      name: false,
      password: false,
      confirmPassword: false,
      email: false,
    },
  }),

  actions: {
    setTouchedField(field: keyof TouchedFields, value: boolean) {
      this.touched[field] = value;
    },
    setAllTouched(value: boolean = true) {
      (Object.keys(this.touched) as Array<keyof TouchedFields>).forEach((key) => {
        this.touched[key] = value;
      });
    },
  },
});
