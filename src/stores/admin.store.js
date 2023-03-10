import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = defineStore({
    id: 'admin',
    state: () => ({
        stats: {},
        users: {}
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
        }
    }

});
