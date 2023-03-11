import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = defineStore({
    id: 'admin',
    state: () => ({
        stats: {},
        users: {},
        desc: false
    }),
    actions: {

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
                this.users = await fetchWrapper.get(`${baseUrl}/users`);
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
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteractionTrue`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyName() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteraction`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        async getUsersbyNameDesc() {
            try {
                this.users = await fetchWrapper.get(`${baseUrl}/users/sort/lastInteractionTrue`);
            }
            catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        }
    }

});
