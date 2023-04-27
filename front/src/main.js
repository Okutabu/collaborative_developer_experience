import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles'


import App from './App.vue';
import { router } from './router';
import { createVuetify } from 'vuetify'

// setup fake api/backend
import { loadMirageInDev } from './helpers';
    

loadMirageInDev();

const app = createApp(App);

app.use(createVuetify());
app.use(createPinia());
app.use(router);

app.mount('#app');


