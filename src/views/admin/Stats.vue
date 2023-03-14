<script setup>
import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
import Donut from './Donut.vue';

const adminStore = useAdminStore();
const { stats } = storeToRefs(adminStore);
adminStore.getStats();
</script>

<template>
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

<style>

table{
    margin : 30px;
}

td {
    border: 1px solid #333;
}

</style>