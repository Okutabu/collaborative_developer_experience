import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAuthStore, useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useUsersStore = defineStore({
  id: 'users',
  state: () => ({
    users: {},
    user: {},
    stats: JSON.parse(localStorage.getItem('stats')) || {}
  }),
  actions: {
    async register (user) {
      await fetchWrapper.post(`${baseUrl}/register`, user);
    },
    async getAll () {
      this.users = { loading: true };
      try {
        this.users = await fetchWrapper.get(baseUrl);
      } catch (error) {
        this.users = { error };
      }
    },
    async getById (id) {
      // Not yet useful
      this.user = { loading: true };
      try {
        this.user = await fetchWrapper.get(`${baseUrl}/${id}`);
      } catch (error) {
        this.user = { error };
      }
    },
    async deleteUser (id) {
      try {
        const authStore = useAuthStore();
        let res = await fetchWrapper.get(`${baseUrl}/${id}/delete`);
        res = JSON.parse(JSON.stringify(res));
        if (id === authStore.user.id) {
          authStore.logout();
        }
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async updateUser (values) {
      try {
        const authStore = useAuthStore();
        let res = await fetchWrapper.post(`${baseUrl}/update`, values);
        res = JSON.parse(JSON.stringify(res));
        localStorage.setItem('user', JSON.stringify(res));
        this.user = res;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async update (id, params) {
      await fetchWrapper.put(`${baseUrl}/${id}`, params);

      // update stored user if the logged in user updated their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        // update local storage
        const user = { ...authStore.user, ...params };
        localStorage.setItem('user', JSON.stringify(user));

        // update auth user in pinia state
        authStore.user = user;
      }
    },
    async delete (id) {
      // add isDeleting prop to user being deleted
      this.users.find(x => x.id === id).isDeleting = true;

      await fetchWrapper.delete(`${baseUrl}/${id}`);

      // remove user from list after deleted
      this.users = this.users.filter(x => x.id !== id);

      // auto logout if the logged in user deleted their own record
      const authStore = useAuthStore();
      if (id === authStore.user.id) {
        authStore.logout();
      }
    },
    async getUserStats (id) {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/${id}/statistics`);
        res = JSON.parse(JSON.stringify(res));
        this.stats = res;
        localStorage.setItem('stats', JSON.stringify(res));
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    }
  }
});
