import { ref } from 'vue';

export function useMenuVisible() {
  const isMenuOpen = ref(false);

  function toggleMenu() {
    isMenuOpen.value = !isMenuOpen.value;
  }

  function closeMenu() {
    isMenuOpen.value = false;
  }

  return {
    isMenuOpen,
    toggleMenu,
    closeMenu,
  };
}
