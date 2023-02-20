import { defineStore } from 'pinia';

import { useAlertStore } from '@/stores';
import { router } from '@/router';
import { fetchWrapper } from '@/helpers';

const API_URL = "http://localhost:8080"

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
const baseUrl = `${API_URL}/user`;

export const useRecoStore = defineStore({
    id : 'reco',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async getRecommandedUsers() {
            try {
                //console.log(user)
                const usersReco = await fetchWrapper.get(`${baseUrl}/954940/similarity/answer`);
                console.log(usersReco);

                //this.user = user;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('usersReco', JSON.stringify(usersReco));

                // redirect to previous url or default to home page
                //router.push(this.returnUrl || '/');
                
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        }
    }
});
