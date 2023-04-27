import { defineStore } from 'pinia';

import { fetchWrapper } from '@/helpers';
import { router } from '@/router';
import { useAlertStore } from '@/stores';



const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useToHelpStore = defineStore({
    id: 'userToHelp',
    state: () => ({
        userToHelp: {}
    }),
    actions: {
        async getDataToHelp(idSTOW) {
            try {
                var res = await fetchWrapper.get(`${baseUrl}/${idSTOW}/help` );
                res = JSON.parse(JSON.stringify(res));
                this.userToHelp = res;
                // update pinia state
                if (this.userToHelp.error == -1){
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




