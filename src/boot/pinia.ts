// src/boot/pinia.ts
import { createPinia } from 'pinia';
import { boot } from 'quasar/wrappers';
import type { App } from 'vue';

export default boot(({ app }: { app: App }) => {
  const pinia = createPinia();
  app.use(pinia);
});
