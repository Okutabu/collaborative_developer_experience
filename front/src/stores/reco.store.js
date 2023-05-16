import { defineStore } from 'pinia';

import { ref } from 'vue';

import { useAlertStore } from '@/stores';

import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/user`;

export const useRecoStore = defineStore({
    id : 'reco',
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        usersRecoAnswer : JSON.parse(localStorage.getItem('usersRecoAnswer')),
        usersRecoSimilarity: JSON.parse(localStorage.getItem('usersRecoSimilarity')),
        usersRecoQuestion: JSON.parse(localStorage.getItem('usersRecoQuestion')),
        usersCurrentReco: JSON.parse(localStorage.getItem('usersCurrentReco')),
        collaborated: JSON.parse(localStorage.getItem('collaborated')),
	      globalQuestions: JSON.parse(localStorage.getItem("globalQuestions")),
        bouton: "null",
        returnUrl: null
    }),
    actions: {
        async getRecommandedUsers() {
            try {
                var user = this.user;
                console.log(user.user.idSTOW);
                const usersRecoAnswer = await fetchWrapper.get(`${baseUrl}/${user.user.idSTOW}/similarity/answer`);
                const usersRecoSimilarity = await fetchWrapper.get(`${baseUrl}/${user.user.idSTOW}/similarity/cosinus`);
                const usersRecoQuestion = await fetchWrapper.get(`${baseUrl}/${user.user.idSTOW}/similarity/question`);
                const collaborated = await fetchWrapper.get(`${baseUrl}/${user.user.idSTOW}/interactedWithMe`);
		            const globalQuestions = await fetchWrapper.get(`${baseUrl}/lastQuestions`);
                
                // update pinia state
                this.usersRecoAnswer = usersRecoAnswer;
                this.usersRecoSimilarity = usersRecoSimilarity;
                this.usersRecoQuestion = usersRecoQuestion;
                this.usersCurrentReco = usersRecoAnswer;
                this.collaborated = collaborated;
		this.globalQuestions = globalQuestions;

                // store user details and jwt in local storage to keep user logged in between page refreshes
                localStorage.setItem('usersRecoAnswer', JSON.stringify(usersRecoAnswer));
                localStorage.setItem('usersRecoSimilarity', JSON.stringify(usersRecoSimilarity));
                localStorage.setItem('usersRecoQuestion', JSON.stringify(usersRecoQuestion));
                localStorage.setItem('usersCurrentReco', JSON.stringify(usersRecoAnswer));
                localStorage.setItem('collaborated', JSON.stringify(collaborated));
		localStorage.setItem("globalQuestions",JSON.stringify(globalQuestions));

            } catch (error) {
                const alertStore = useAlertStore();
                console.log(error.message);           
            }
        },

        async rotateRecomendationsToSimilar(){
            try {
                
                    this.usersCurrentReco = this.usersRecoSimilarity;
                }
 
            catch {
                const alertStore = useAlertStore();
                console.log(error.message);    
            }
        },

        async rotateRecomendationsToHelper(){
            try {
                
                    this.usersCurrentReco = this.usersRecoAnswer;
                }
 
            catch {
                const alertStore = useAlertStore();
                console.log(error.message);    
            }
        },

        async rotateRecomendationsToHelpable(){
            try {
                
                    this.usersCurrentReco = this.usersRecoQuestion;
                }
 
            catch {
                const alertStore = useAlertStore();
                console.log(error.message);    
            }
        },

    }
});
