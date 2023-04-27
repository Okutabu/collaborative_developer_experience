<script setup>

import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useToHelpStore } from '@/stores';
import { useRoute } from 'vue-router'
import UserCard2 from '../../components/UserCard2.vue';

const route = useRoute()
const toHelpStore = useToHelpStore();
const { userToHelp } = storeToRefs(toHelpStore);
toHelpStore.getDataToHelp(route.params.id);







</script>

<template>

    <h1>Vous êtes le profil parfait pour aider {{ userToHelp.user.profile[0].pseudo }} !</h1>

    <!-- Affiche le profil de l'utilisateur qui a besoin d'aide -->
    <div class="container-profile-">
        <div class="container-card"> <UserCard2 :nom=userToHelp.user.profile[0].pseudo :techno=userToHelp.user.profile[1] :avatar=userToHelp.user.profile[0].avatar  :reco=userToHelp.user.profile[1][0].techno :key=userToHelp :lastInteract=userToHelp.user.profile[0].lastInteraction /> </div>
    </div>

    <h2>Voici les questions que vous pouvez aider à résoudre :</h2>

    <!-- affiche une liste de questions avec le nom de la question et un bouton pour acceder à l'url de la quesiton -->
    <ul>
        <div class="list-row" v-for="question in userToHelp.user.questions">
            <li>{{ question.title }}</li>
            <a :href="question.urlQuestion" target="_blank"><button class="btn btn-primary">Accéder à la question</button></a>
        </div>
    </ul>


</template>

<style>

</style>