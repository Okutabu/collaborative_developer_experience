<script setup>
import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
import Donut from './Donut.vue';
import Header from '../../components/Header.vue';
import { ref } from "vue"; 


const adminStore = useAdminStore();
const { stats } = storeToRefs(adminStore);
adminStore.getStats();

const espace = ref('d\'administration')
const message = ref('Découvrez toutes les statistiques de la plateforme !')

const user = localStorage.getItem('user')
const userJson = JSON.parse(user)

</script>

<template>
    <div v-if="userJson">
        <Header :surname=userJson.user.surname  :name=userJson.user.name :espace=espace :message=message />
    </div>
    <div>
        <!-- <Donut :technoInteraction=stats.topTags /> 


        <p> nb tags : {{ stats.nbTags }}</p>
        <p> nb utilisateurs : {{ stats.nbUsers }}</p>
        <p> top tags : {{ stats.topTags }}</p>
        
        <p>nbInteractions : {{ stats.nbInteractions }}</p>
        <p>nbAnswers : {{  stats.nbAnswers }}</p>
        <p>nbActiveUsers : {{  stats.nbActiveUsers }}</p>
        <p>tagsWithMostUsers : {{ stats.tagsWithMostUsers }}</p>
        -->

        <table>
            <tr>
                <td>Le nombre de tags différents</td>
                <td>{{ stats.nbTags }}</td>
            </tr>
            <tr>
                <td>Le nombre d'utilisateurs</td>
                <td>{{ stats.nbUsers }}</td>
            </tr>
            <tr>
                <td>Les tags avec le plus d'intéractions</td>
                <td>{{ stats.topTags }}</td>
            </tr>
            <tr>
                <td>Le nombre d'intéractions totales</td>
                <td>{{ stats.nbInteractions }}</td>
            </tr>
            <tr>
                <td>Le nombre de réponses totales</td>
                <td>{{ stats.nbAnswers }}</td>
            </tr>
            <tr>
                <td>Le nombre d'utilisateurs actifs</td>
                <td>{{  stats.nbActiveUsers }}</td>
            </tr>
            <tr>
                <td>Les tags avec le plus d'utilisateurs qui ont intéragit dessus</td>
                <td>{{  stats.tagsWithMostUsers }}</td>
            </tr>

        </table>
    </div>

</template>

<style scoped>

table{
    margin : 30px;
}

td {
    border: 1px solid #333;
}

</style>