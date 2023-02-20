import { defineStore } from 'pinia';

import { useAlertStore } from '@/stores';

import { fetchWrapper } from '@/helpers';

const API_URL = "http://localhost:8080"

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
const baseUrl = `${API_URL}/user`;

export const useRecoStore = defineStore({
    id : 'reco',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        usersReco : JSON.parse(localStorage.getItem('usersReco')),
        returnUrl: null
    }),
    actions: {
        async getRecommandedUsers() {
            try {
            
                const usersReco = await fetchWrapper.get(`${baseUrl}/${this.user.user.idSTOW}/similarity/answer`);
                
                // update pinia state
                this.usersReco = usersReco;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('usersReco', JSON.stringify(usersReco));
                
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        }
    }
});
