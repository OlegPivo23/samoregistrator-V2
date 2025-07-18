<script setup lang="ts">
import { useForm } from 'src/composables/useForm';
import { useAuthStore } from '../stores/useAuthStore';
import { useFormStore } from '../../../stores/useFormStore';

const authStore = useAuthStore();
const formStore = useFormStore();

const {
  formFields,
  errors,
  currentFormConfig,
  formTitle,
  submitButtonLabel,
  isValid,
  handleSubmit,
  switchForm,
  handleBlur,
} = useForm();
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
      <form @submit.prevent="handleSubmit" class="space-y-2">
        <h2 class="text-xl font-semibold text-center text-gray-800 uppercase tracking-wide">
          {{ formTitle }}
        </h2>

        <div v-for="(field, index) in currentFormConfig.fields" :key="index">
          <label :for="field.model" class="block text-sm font-medium text-gray-700 mb-1">
            {{ field.label }}
          </label>

          <q-input
            v-model="formFields[field.model]"
            :type="field.type"
            :id="field.model"
            class="w-full"
            @blur="handleBlur(field.model)"
            :error="formStore.touched[field.model]"
            :error-message="errors[field.error]"
            :label="field.label"
            outlined
          />
        </div>
        <q-btn
          :disabled="!isValid"
          type="submit"
          :label="submitButtonLabel"
          color="primary"
          class="w-full"
          :loading="authStore.isLoading"
        />
      </form>

      <div
        class="text-center space-y-2 mt-4"
        v-for="(button, index) in currentFormConfig.buttons"
        :key="index"
      >
        <q-btn
          @click="switchForm(button.targetForm)"
          flat
          :label="button.label"
          color="primary"
          class="w-full"
        />
      </div>
    </div>
  </div>
</template>
