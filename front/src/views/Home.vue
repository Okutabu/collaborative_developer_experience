<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';
import DynamicCard from '../components/DynamicCard.vue';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useRecoStore();
const { usersReco, usersRecoSimilarity, usersRecoQuestion } = storeToRefs(usersStore);

const typeSimilaire = ref('Projet similaire')
const typeReponse= ref('Helper')
const typeQuestion = ref('To help')

</script>

<template>
    <div v-if="user" class="header">
        <div class="container-welcome-message">
                <h2>Bienvenue sur votre espace de collaboration !</h2>
                <p class="text-muted"> Faites de nouvelles rencontres</p>
        </div>
        <div class="container-action-bar">
            <div class="container-bell">
                <!-- <b-icon icon="bell-fill" class="border rounded p-2"></b-icon> -->
            </div>
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{user.surname}} {{user.name}}</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
                </div>
            </div>
        </div>
    
    </div>

    <div class="container-similarities">
        
        <div class="container-raw-cosinus-similarity" v-if="usersRecoSimilarity">
            <span class="categorie-recommendation">Utilisateurs similaires à vous</span>
            <DynamicCard v-for="user in usersRecoSimilarity.users" :nom=user[0].pseudo :type=typeSimilaire :reco=user[1][0].techno :techno=user[1] :avatar=user[0].avatar /> 
        </div>
        <div v-else>
            <div class="spinner-border custom-spinner" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="container-similarity-tag-answers" v-if="usersReco">
            <span class="categorie-recommendation">Utilisateurs qui repondent à vos questions</span>
            <DynamicCard v-for="user in usersReco.users" :nom=user[0].pseudo :type=typeReponse :reco=user[1][0].techno :techno=user[1] :avatar=user[0].avatar />
            
        </div>
        <div v-else>
            <div class="spinner-border custom-spinner" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <div class="container-similarity-tag-questions" v-if="usersRecoQuestion">
            <span class="categorie-recommendation">Utilisateurs que vous pouvez aider</span>
            <DynamicCard v-for="user in usersRecoQuestion.users" :nom=user[0].pseudo :type=typeQuestion :reco=user[1][0].techno :techno=user[1] :avatar=user[0].avatar />
            
        </div>
        <div v-else>
            <div class="spinner-border custom-spinner" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
    
    

</template>

<style>

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--cde-c-palette-dark-4);
    width: 100%;
}

.container-action-bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 20%;
}

.container-similarities {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: var(--cde-c-palette-dark-2);
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
}

</style>