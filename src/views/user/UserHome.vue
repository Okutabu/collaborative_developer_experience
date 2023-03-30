<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';
import UserCardSimplified from '../../components/UserCardSimplified.vue';
import Header from '../../components/Header.vue';
import UserCard from '../../components/UserCard.vue';
import UserCarCollaborative from '../../components/UserCarCollaborative.vue';



const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useRecoStore();
const { usersReco, usersRecoSimilarity, usersRecoQuestion } = storeToRefs(usersStore);

const typeSimilaire = ref('Projet similaire')
const typeReponse= ref('Helper')
const typeQuestion = ref('To help')


const userSelected = ref(null);

function onClick(userParam) {
    userSelected.value = userParam;
    console.log("yo wtf: ",userSelected[0][1]);
}


console.log(usersRecoSimilarity);
</script>

<template>
    <div class="container-home">
        <div v-if="user">
            <Header :surname=user.user.surname  :name=user.user.name />
        </div>

        <div class="container-similarities">
            
            <div class="container-raw-cosinus-similarity" v-if="usersRecoSimilarity">
                <span class="categorie-recommendation">Utilisateurs similaires à vous</span>
                <div @click="onClick(usersRecoSimilarity.users)">
                    <UserCarCollaborative :user="usersRecoSimilarity" :type="typeSimilaire"/>
                </div>
            </div>
            <div v-else>
                <div class="spinner-border custom-spinner" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="container-similarity-tag-answers" v-if="usersReco">
                <span class="categorie-recommendation">Utilisateurs qui repondent à vos questions</span>
                <div @click="onClick(usersReco.users)">
                    <UserCarCollaborative :user="usersReco" :type="typeReponse"/>
                </div>
            </div>
            <div v-else>
                <div class="spinner-border custom-spinner" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div class="container-similarity-tag-questions" v-if="usersRecoQuestion">
                <span class="categorie-recommendation">Utilisateurs que vous pouvez aider</span>
                <div @click="onClick(usersRecoQuestion.users)">
                    <UserCarCollaborative :user="usersRecoQuestion" :type="typeQuestion"/>
                </div>
            </div>
            <div v-else>
                <div class="spinner-border custom-spinner" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        </div>

        <div class="container-usercard-peek"> 
            <div v-if="userSelected">
                <UserCard :nom=userSelected[0][0].pseudo :techno=userSelected[0][1] :avatar=userSelected[0][0].avatar :reco=userSelected[0][1][0].techno :key=userSelected :lastInteract=userSelected[0][0].lastInteraction /> 
            </div>
            <div v-else class="waiting-clic">
            </div>
        </div>
    </div>
    

</template>

<style scoped>

.container-similarities {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    /* background-color: rgb(230, 230, 230); */
    padding-top: 50px;
 

}

.container-usercard-peek {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    /* background-color: rgb(230, 230, 230); */
    
}

.custom-spinner {
    width: 3rem;
    height: 3rem;
    margin: 1rem;
    color: var(--cde-c-palette-dark-4);
}


.container-raw-cosinus-similarity, .container-similarity-tag-answers, .container-similarity-tag-questions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
}

.categorie-recommendation{
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 1em;
    border-radius: 30px;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    /* background-color: rgba(87 , 176, 192, 0.3); */
}

.waiting-clic{
    height: 450px;
    background-color: rgb(230, 230, 230);
    
}
/*couleur rose du logo PTC (234, 51, 75) */

.container-home{
    background-color: aliceblue;
    animation: reveal 1s cubic-bezier(.17,.67,.4,1.02); 
}
</style>