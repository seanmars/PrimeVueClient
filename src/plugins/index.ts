/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import pinia from '../stores';
import router from '../router';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';

// Types
import type { App } from 'vue';

export function registerPlugins(app: App) {
  app
    .use(pinia)
    .use(router)
    .use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    });
}
