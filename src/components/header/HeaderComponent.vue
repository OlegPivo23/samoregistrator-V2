<script setup lang="ts">
import { useMenuVisible } from 'src/composables/useMenuVisible';

const { isMenuOpen, closeMenu, toggleMenu } = useMenuVisible();
</script>
<template>
  <header class="bg-white shadow-md relative z-50">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold text-blue-600">
        <a href="#">Samoregistrator</a>
      </div>

      <nav class="desctop md:flex">
        <RouterLink to="/cabinet" class="text-gray-700 hover:text-blue-500 transition">
          Личный кабинет
        </RouterLink>
        <RouterLink to="/questions" class="text-gray-700 hover:text-blue-500 transition">
          Опросники
        </RouterLink>
      </nav>

      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Мобильное меню -->
    <transition name="slide">
      <div
        v-if="isMenuOpen"
        class="fixed top-0 right-0 w-3/5 max-w-[240px] h-full bg-white shadow-lg p-6 flex flex-col space-y-4 md:hidden z-40"
      >
        <RouterLink
          @click="closeMenu"
          to="/cabinet"
          class="text-gray-700 hover:text-blue-500 transition"
        >
          Личный кабинет
        </RouterLink>
        <RouterLink
          @click="closeMenu"
          to="/questions"
          class="text-gray-700 hover:text-blue-500 transition"
        >
          Опросники
        </RouterLink>
      </div>
    </transition>

    <div
      v-if="isMenuOpen"
      @click="closeMenu"
      class="fixed inset-0 backdrop-blur-[2px] bg-black/20 md:hidden z-30 transition-opacity duration-400"
    ></div>
  </header>
</template>

<style scoped>
.desctop {
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition:
    transform 0.4s ease-in-out,
    opacity 0.4s ease-in-out;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0.8;
}

.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
