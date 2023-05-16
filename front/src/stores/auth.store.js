import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    returnUrl: null
  }),
  actions: {
    async login (idSTOW) {
      try {
        const user = await fetchWrapper.post(`${baseUrl}/login`, { idSTOW });

        // update pinia state
        if (user.error == -1) {
          router.push(this.returnUrl || '/login');
        } else {
          this.user = user;

          // store user details and jwt in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));

          // redirect to home page
          router.push('/');
        }
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    logout () {
      this.user = null;
      router.push('/account/login');

      // Vide le local storage
      localStorage.clear();

      window.location.reload();
    }
  }
});
