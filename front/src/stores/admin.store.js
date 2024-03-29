import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = defineStore({
  id: 'admin',
  state: () => ({
    stats: JSON.parse(localStorage.getItem('stats')),
    users: JSON.parse(localStorage.getItem('users')),
    usersDotUsers: [],
    InteractionDates: JSON.parse(localStorage.getItem('InteractionDates')),
    desc: false
  }),
  actions: {
    async getUsersDotUsers () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users`);
        res = JSON.parse(JSON.stringify(res));
        this.usersDotUsers = res.users;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getStats () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/statistics`);
        res = JSON.parse(JSON.stringify(res));
        this.stats = res;
        localStorage.setItem('stats', JSON.stringify(res));
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getInteractionDates () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/InteractionDates`);
        res = JSON.parse(JSON.stringify(res));
        this.InteractionDates = res.dates;
        localStorage.setItem('InteractionDates', JSON.stringify(res.dates));
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUserProficiency (id) {
      try {
        let res = await fetchWrapper.get(`${import.meta.env.VITE_API_URL}/user/${id}/proficiency`);
        res = JSON.parse(JSON.stringify(res));
        this.userClic = res;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUsers () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users`);
        res = JSON.parse(JSON.stringify(res));
        this.users = res.users;
        localStorage.setItem('users', JSON.stringify(res.users));
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUsersbyLastActivity () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteraction`);
        res = JSON.parse(JSON.stringify(res));
        this.users = res.users;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUsersbyLastActivityDesc () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteraction/desc`);
        res = JSON.parse(JSON.stringify(res));
        this.users = res.users;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUsersbyName () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users/sort/name`);
        res = JSON.parse(JSON.stringify(res));
        this.users = res.users;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUsersbyNameDesc () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users/sort/name/desc`);
        res = JSON.parse(JSON.stringify(res));
        this.users = res.users;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUsersbySurname () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users/sort/surname`);
        res = JSON.parse(JSON.stringify(res));
        this.users = res.users;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    },
    async getUsersbySurnameDesc () {
      try {
        let res = await fetchWrapper.get(`${baseUrl}/users/sort/surname/desc`);
        res = JSON.parse(JSON.stringify(res));
        this.users = res.users;
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
      }
    }
  }

});
