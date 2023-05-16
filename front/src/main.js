import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'vuetify/styles';

import App from './App.vue';
import { router } from './router';
import { createVuetify } from 'vuetify';

// setup fake api/backend
import { loadMirageInDev } from './helpers';

// setup for internationalizing
import { createI18n } from 'vue-i18n';
import { messages } from './locales';

const language = getInitialLocale();

export const i18n = createI18n({
  legacy: false,
  locale: language, // : 'en', //getInitialLocale(),
  fallbackLocale: 'en',
  messages
});

// get locale based on the user's navigator location
function getInitialLocale () {
  const navigatorLocale = navigator.language || navigator.userLanguage;
  const languageCode = navigatorLocale.split('-')[0];
  let lang;
  if (Object.keys(messages).includes(languageCode)) {
    lang = languageCode;
  } else {
    lang = i18n.fallbackLocale;
  }
  return lang;
}

loadMirageInDev();

const app = createApp(App);

app.use(i18n);
app.use(createVuetify());
app.use(createPinia());
app.use(router);

app.mount('#app');
