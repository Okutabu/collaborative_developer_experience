<script setup>
import { storeToRefs } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';
import UserCardSimplified from '@/components/UserCardSimplified.vue';
import Header from '@/components/Header.vue';
import UserCard from '@/components/UserCard.vue';
import UserCarCollaborative from '@/components/UserCarCollaborative.vue';



const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useRecoStore();
const { usersReco, usersRecoSimilarity, usersRecoQuestion, collaborated } = storeToRefs(usersStore);

const dataForLoadingUsersRecos = {
                                
                                "answer": "Users found", 
                                "users":[ 
                                            [ {   
                                                "idSTOW": { "low": 11804213, "high": 0 }, 
                                                "pseudo": "Franck", 
                                                "avatar": "https://i.stack.imgur.com/H1G7n.png?s=256&g=1" },
                                                [ 
                                                    { "techno": "Macmini", "ratio": 18.52941176470588 }, 
                                                    { "techno": "material-ui", "ratio": 17.647058823529413 }, 
                                                    { "techno": "http-live-streaming", "ratio": 8.823529411764707 }, 
                                                    { "techno": "vercel", "ratio": 8.823529411764707 }, 
                                                    { "techno": "hls.js", "ratio": 8.823529411764707 } ] ]
                                                
                                            ]};

const dataForLoadingUsersRecosSimilarity = dataForLoadingUsersRecos;
const dataForLoadingUsersRecosQuestion = dataForLoadingUsersRecos;

const typeSimilaire = ref('Projet similaire')
const typeReponse= ref('Helper')
const typeQuestion = ref('To help')

</script>


<template>
    <span class="categorie-recommendation">Utilisateurs qui repondent à vos questions</span>
    <div @click="onClick(usersReco.users)">
        <UserCarCollaborative :user="usersReco" :type="typeReponse"/>
    </div>
    

</template>