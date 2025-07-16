// useMenuVisible.spec.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { useMenuVisible } from 'src/composables/useMenuVisible';

describe('useMenuVisible', () => {
  let isMenuOpen: ReturnType<typeof useMenuVisible>['isMenuOpen'];
  let toggleMenu: ReturnType<typeof useMenuVisible>['toggleMenu'];
  let closeMenu: ReturnType<typeof useMenuVisible>['closeMenu'];

  beforeEach(() => {
    const { isMenuOpen: menuOpen, toggleMenu: menuToggle, closeMenu: menuClose } = useMenuVisible();
    isMenuOpen = menuOpen;
    toggleMenu = menuToggle;
    closeMenu = menuClose;
  });

  it('closeMenu должен установить isMenuOpen в false', () => {
    closeMenu();
    expect(isMenuOpen.value).toBe(false);
  });

  it('toggleMenu должен переключать состояние isMenuOpen', () => {
    expect(isMenuOpen.value).toBe(false);

    toggleMenu();
    expect(isMenuOpen.value).toBe(true);

    toggleMenu();
    expect(isMenuOpen.value).toBe(false);
  });
});
