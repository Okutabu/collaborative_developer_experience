import { defineStore } from 'pinia';

import { useAlertStore } from '@/stores';

import { fetchWrapper } from '@/helpers';


const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useRecoStore = defineStore({
    id : 'reco',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        usersReco : JSON.parse(localStorage.getItem('usersReco')),
        usersRecoSimilarity: JSON.parse(localStorage.getItem('usersRecoSimilarity')),
        usersRecoQuestion: JSON.parse(localStorage.getItem('usersRecoQuestion')),
        returnUrl: null
    }),
    actions: {
        async getRecommandedUsers() {
            try {

                var user = this.user;
                console.log(user.user.idSTOW);
                const usersReco = await fetchWrapper.get(`${baseUrl}/${user.user.idSTOW}/similarity/answer`);
                const usersRecoSimilarity = await fetchWrapper.get(`${baseUrl}/${user.user.idSTOW}/similarity/cosinus`);
                const usersRecoQuestion = await fetchWrapper.get(`${baseUrl}/${user.user.idSTOW}/similarity/question`);
                
                // update pinia state
                this.usersReco = usersReco;
                this.usersRecoSimilarity = usersRecoSimilarity;
                this.usersRecoQuestion = usersRecoQuestion;

                console.log(usersReco);

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('usersReco', JSON.stringify(usersReco));
                localStorage.setItem('usersRecoSimilarity', JSON.stringify(usersRecoSimilarity));
                localStorage.setItem('usersRecoQuestion', JSON.stringify(usersRecoQuestion));

            } catch (error) {
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        }
    }
});
