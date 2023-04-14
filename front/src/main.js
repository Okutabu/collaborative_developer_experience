import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router } from './router';

// setup fake api/backend
import { loadMirageInDev } from './helpers';
    

loadMirageInDev();

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');


