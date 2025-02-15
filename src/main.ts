import './style.css';

// Plugins

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';
import { registerPlugins } from '@/plugins';

const app = createApp(App);

registerPlugins(app);

app.mount('#app');