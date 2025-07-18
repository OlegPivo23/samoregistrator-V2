<script setup lang="ts">
import { computed, ref } from 'vue';
import { QInput, QBtn } from 'quasar';

type FormFieldKey = 'name' | 'password' | 'confirmPassword';

interface ProfileFormData {
  name: string;
  password: string;
  confirmPassword: string;
}

interface ProfileField {
  label: string;
  model: FormFieldKey;
  type: 'text' | 'password';
  rules: ((val: string) => true | string)[];
}

const formData = ref<ProfileFormData>({
  name: 'Иван Иванов',
  password: '',
  confirmPassword: '',
});

const profileFields = ref<ProfileField[]>([
  {
    label: 'Имя',
    model: 'name',
    type: 'text',
    rules: [
      (val: string) => (val && val.length >= 2) || 'Имя должно содержать 2 или более символов',
      (val: string) =>
        /^[a-zA-Zа-яА-Я\s]*$/.test(val) || 'Имя должно содержать только буквы и пробелы',
    ],
  },
  {
    label: 'Новый пароль',
    model: 'password',
    type: 'password',
    rules: [
      (val: string) => (val && val.length > 6) || 'Пароль должен содержать не менее 6 символов',
    ],
  },
  {
    label: 'Подтвердите пароль',
    model: 'confirmPassword',
    type: 'password',
    rules: [(val: string) => val === formData.value.password || 'Пароли не совпадают'],
  },
]);

const saveProfile = () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    alert('Пароли не совпадают!');
    return;
  }

  alert('Данные успешно сохранены!');
  console.log('Сохранённые данные:', formData.value);
};

const isFormValid = computed(() => {
  return profileFields.value.every((field) => {
    const isValid = field.rules.every((rule) => rule(formData.value[field.model]) === true);
    return isValid;
  });
});
</script>

<template>
  <form @submit.prevent="saveProfile" class="space-y-4">
    <div v-for="(field, index) in profileFields" :key="index">
      <label :for="field.model" class="block text-sm font-medium text-gray-700">
        {{ field.label }}
      </label>
      <q-input
        v-model="formData[field.model]"
        :type="field.type"
        :id="field.model"
        class="mt-1 w-full"
        :label="field.label"
        outlined
        :rules="field.rules"
        clearable
      />
    </div>

    <div>
      <q-btn
        type="submit"
        label="Сохранить"
        color="primary"
        class="w-full"
        :disable="!isFormValid"
      />
    </div>
  </form>
</template>
