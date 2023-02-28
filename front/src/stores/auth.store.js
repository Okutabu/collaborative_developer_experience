import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';

const API_URL = "http://localhost:8080"

//const baseUrl = `${import.meta.env.VITE_API_URL}/users`;
const baseUrl = `${API_URL}/user`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(idSTOW) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/login`, { idSTOW });    
            
                // update pinia state
                if (user.error == -1){
                    console.log("L'utilisateur n'existe pas")
                    router.push(this.returnUrl || '/login');

                }else{
                    this.user = user;

                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));

                    // redirect to previous url or default to home page
                    router.push(this.returnUrl || '/');
                }
                
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
            localStorage.removeItem('usersReco');
            localStorage.removeItem('usersRecoSimilarity');
            localStorage.removeItem('usersRecoQuestion');
        }
    }
});
