<script setup>
import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
import Donut from './Donut.vue';
import Header from '../../components/Header.vue';
import { ref } from "vue"; 


import { CalendarHeatmap } from '@/components/Heatmap.vue';

Vue.use(CalendarHeatmap);


const adminStore = useAdminStore();
const { stats } = storeToRefs(adminStore);
adminStore.getStats();

const espace = ref('d\'administration')
const message = ref('Découvrez toutes les statistiques de la plateforme !')

const user = localStorage.getItem('user')
const userJson = JSON.parse(user)

const obj = [
    { date: '2021-01-01', count: 1 },
    { date: '2021-02-02', count: 2 },
    { date: '2021-03-03', count: 3 },
    { date: '2021-04-04', count: 4 },
    { date: '2021-05-05', count: 5 },
    { date: '2021-05-06', count: 6 },
    { date: '2021-06-07', count: 7 },
    { date: '2021-07-08', count: 5 },
    { date: '2021-08-09', count: 7 },
    { date: '2021-08-10', count: 1 },
    { date: '2021-08-11', count: 5 },
    { date: '2021-09-12', count: 8 },
    { date: '2021-10-13', count: 13 },
    { date: '2021-11-14', count: 7 },
    { date: '2021-12-15', count: 2 },
    { date: '2022-01-16', count: 1 },
    { date: '2022-03-17', count: 8 },
    { date: '2022-04-18', count: 10 },
    { date: '2022-04-19', count: 9 },
    { date: '2022-07-20', count: 2 },
    { date: '2022-07-21', count: 5 },
    { date: '2022-08-22', count: 4 },
    { date: '2022-09-23', count: 9 },
    { date: '2022-10-24', count: 6 },
    { date: '2022-10-25', count: 7 },
    { date: '2022-11-26', count: 4 },
    { date: '2022-12-27', count: 2 },
    { date: '2023-01-28', count: 4 },
    { date: '2023-02-29', count: 11 },
]

const today = new Date();

</script>

<template>

    <CalendarHeatmap :data="obj" :EndDate="{today}" />

    <div v-if="userJson">
        <Header :surname=userJson.user.surname  :name=userJson.user.name :espace=espace :message=message />
    </div>
    <div class="container-table">
        <!-- <Donut :technoInteraction=stats.topTags /> 


        <p> nb tags : {{ stats.nbTags }}</p>
        <p> nb utilisateurs : {{ stats.nbUsers }}</p>
        <p> top tags : {{ stats.topTags }}</p>
        
        <p>nbInteractions : {{ stats.nbInteractions }}</p>
        <p>nbAnswers : {{  stats.nbAnswers }}</p>
        <p>nbActiveUsers : {{  stats.nbActiveUsers }}</p>
        <p>tagsWithMostUsers : {{ stats.tagsWithMostUsers }}</p>
        -->
        
        <table class="table-body">
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

.container-table {
    background-color: rgb(230, 230, 230);
    padding: 30px;
    height: 660px;
}
.table-body td{
    width: 25%;
}

.table-body tr{ 
    height: 50px;
    border-bottom: 1px solid rgb(200, 200, 200);
    border-top: 1px solid rgb(200, 200, 200);
    text-align: center;
}




</style>