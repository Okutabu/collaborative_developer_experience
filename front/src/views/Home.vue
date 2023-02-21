<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import UserCardSimplified from '../components/UserCardSimplified.vue';
import UserCard from '../components/UserCard.vue';

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';
import DynamicCard from '../components/DynamicCard.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useRecoStore();
const { usersReco, usersRecoSimilarity, usersRecoQuestion } = storeToRefs(usersStore);

 
//usersReco.users[2][0].idSTOW

const users = [{idSTOW: 20740880, similarity: 1, nom: "john"}, {idSTOW: 4198317, similarity: 1, nom: "bob"}]

const typeSimilaire = ref('Projet similaire')
const typeReponse= ref('Helper')
const typeQuestion = ref('To help')

</script>

<template>
    <div v-if="user">
    <h1>Bonjour {{user.user.surname}} ! </h1>
    <h4>Bienvenue sur votre espace de collaboration PTC</h4>
    <p> Votre id Stack overflow est : {{ user.user.idSTOW }}</p>
    </div>

    <div class="container-similarities">
        <div class="container-raw-cosinus-similarity">
            <span class="categorie-recommendation">Utilisateurs similaires à vous</span>
            <DynamicCard v-for="user in usersRecoSimilarity.users" :nom=user[0].idSTOW :type=typeSimilaire :reco=user[1][0].techno :techno=user[1] />
        </div>
        <div class="container-similarity-tag-answers">
            <span class="categorie-recommendation">Utilisateurs qui repondent à vos questions</span>
            <DynamicCard v-for="user in usersReco.users" :nom=user[0].idSTOW :type=typeReponse :reco=user[1][0].techno :techno=user[1] />
            
        </div>
        <div class="container-similarity-tag-questions">
            <span class="categorie-recommendation">Utilisateurs que vous pouvez aider</span>
            <DynamicCard v-for="user in usersRecoQuestion.users" :nom=user[0].idSTOW :type=typeQuestion :reco=user[1][0].techno :techno=user[1] />
            
        </div>
    </div>
    
    

</template>

<style>

.container-similarities {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-top: 50px;
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
}

</style>