import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useProfileStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('userProfile')),
        returnUrl: null
    }),
    actions: {
        async setUserProfile(idSTOW) {
            try {
                const user = await fetchWrapper.post(`${baseUrl}/${ idSTOW }/proficiency`, );   
            
                // update pinia state
                if (user.error == -1){
                    console.log("L'utilisateur n'existe pas")
                    router.push(this.returnUrl || '/');

                }else{
                    this.user = user;

                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('userProfile', JSON.stringify(user));

                    // redirect to previous url or default to home page
                    router.push(this.returnUrl || '/');
                }
                
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        
    }
});
