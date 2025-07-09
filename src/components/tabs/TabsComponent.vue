<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

type Tab = 'profile' | 'contact';

defineProps<{
  activeTab: Tab;
}>();

const emit = defineEmits<{
  (e: 'update:activeTab', tab: Tab): void;
}>();

const switchTab = (tab: Tab) => {
  emit('update:activeTab', tab);
};
</script>

<template>
  <div class="mb-6">
    <ul class="flex justify-center border-b border-gray-300">
      <li
        :class="{ 'border-b-2 border-blue-500': activeTab === 'profile' }"
        class="mr-6 cursor-pointer py-2 text-sm text-gray-600 hover:text-blue-500"
        @click="switchTab('profile')"
      >
        Редактировать профиль
      </li>
      <li
        :class="{ 'border-b-2 border-blue-500': activeTab === 'contact' }"
        class="cursor-pointer py-2 text-sm text-gray-600 hover:text-blue-500"
        @click="switchTab('contact')"
      >
        Контактные данные
      </li>
    </ul>
  </div>
</template>
