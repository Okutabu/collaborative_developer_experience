import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = defineStore({
    id: 'admin',
    state: () => ({
        stats: {}
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
        }
    }

});
