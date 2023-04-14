import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';



const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useProfileStore = defineStore({
    id: 'userCardValue',
    state: () => ({
        userCardValue: {}
    }),
    actions: {
        async setUserProfile(idSTOW) {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/${idSTOW}/proficiency` );
                res = JSON.parse(JSON.stringify(res));
                this.userCardValue = res;
                // update pinia state
                if (this.userCardValue.error == -1){
                    console.log("L'utilisateur n'existe pas")
                    router.push(this.returnUrl || '/');

                }
                
            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        }
    }
});




