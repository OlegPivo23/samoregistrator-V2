<script setup lang="ts">
import MainLayout from 'src/layouts/MainLayout.vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref();

onMounted(() => {
  id.value = Number(route.params.id);
});
</script>

<template>
  <MainLayout> Card page {{ id }} </MainLayout>
</template>
