<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineEmits(['action']);

const props = defineProps({
  icon: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  actionText: {
    type: String,
    default: '',
  },
  showAction: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <q-card class="no-data-card">
    <q-card-section class="content-section">
      <img src="/public/img/no-data/no-data-icon.svg" alt="Иконка отсутствия информации" />

      <div v-if="props.title" class="title">
        {{ props.title }}
      </div>

      <div v-if="props.description" class="description">
        {{ props.description }}
      </div>

      <slot name="action">
        <q-btn
          v-if="props.showAction && props.actionText"
          color="primary"
          outline
          :label="props.actionText"
          @click="$emit('action')"
          class="q-mt-md"
        />
      </slot>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.no-data-card {
  max-width: 600px;
  margin: 40px auto;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
  background: linear-gradient(to bottom right, #ffffff, #f1f3f6);
  animation: fadeIn 0.4s ease;
}

.content-section {
  text-align: center;
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon {
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.description {
  font-size: 16px;
  color: #7f8c8d;
  margin-top: 10px;
  max-width: 400px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
