import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';

// setup fake backend
import { fakeBackend } from './helpers';
import { loadMirageInDev } from './helpers';
fakeBackend();
loadMirageInDev();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
