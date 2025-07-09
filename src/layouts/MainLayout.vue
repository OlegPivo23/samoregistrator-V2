<script setup lang="ts">
import HeaderComponent from 'src/components/header/HeaderComponent.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen max-w-[1440px] w-full mx-auto">
    <header class="flex-shrink-0">
      <HeaderComponent />
    </header>
    <main class="flex-grow">
      <slot />
    </main>
  </div>
</template>
