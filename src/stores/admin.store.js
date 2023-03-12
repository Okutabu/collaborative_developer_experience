import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = defineStore({
    id: 'admin',
    state: () => ({
        stats: {},
        users: {},
        usersDotUsers: [],
        desc: false
    }),
    actions: {
        async getUsersDotUsers() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users`);
                res = JSON.parse(JSON.stringify(res));
                this.usersDotUsers = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getStats() {
            try {
                this.stats = await fetchWrapper.get(`${baseUrl}/statistics`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsers() {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/users`);
                res = JSON.parse(JSON.stringify(res));
                this.users = res.users;
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyLastActivity() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteraction`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyLastActivityDesc() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteraction/desc`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyName() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/name`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyNameDesc() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/name/desc`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbySurname() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/surname`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbySurnameDesc() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/surname/desc`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        }
    }

});
