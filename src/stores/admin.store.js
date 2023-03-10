import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/admin`;

export const useAdminStore = defineStore({
    id: 'admin',
    state: () => ({
        stats: {}
    }),
    actions: {
        async getStats() {
            stats.push(await fetchWrapper.get(`${baseUrl}/stats`));
        }
    }

});
