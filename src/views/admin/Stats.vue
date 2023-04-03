<script setup>

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
import Donut from './Donut.vue';
import { ref } from "vue"; 

import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data } from '../../data';

var endDate    = new Date('2023-03-27');
var orientation= 'horizontal';


const adminStore = useAdminStore();
const { stats, InteractionDates } = storeToRefs(adminStore);
adminStore.getStats();
adminStore.getInteractionDates();

const espace = ref('d\'administration')
const message = ref('Découvrez toutes les statistiques de la plateforme !')

const user = localStorage.getItem('user')
const userJson = JSON.parse(user)

        
</script>

<template>
    
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
                <td>Les tags avec le plus d'interactions</td>   
                <div v-for="tag in stats.topTags" class="container-tags">
                    <td>{{ tag.tag + " : " + tag.nbInteractions }}</td>
                </div>
            </tr>
            <tr>
                <td>Le nombre d'interactions totales</td>
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
                <div v-for="tag in stats.tagsWithMostUsers" class="container-tags">
                    <td>{{ tag.tag + " : " + tag.nbInteractions }}</td>
                </div>
            </tr>

        </table>
        <div class="container-heatmap">
		<calendar-heatmap :values="InteractionDates" :end-date="endDate" :style="{'max-width': orientation === 'vertical' ? '145px' :  '675px'}" :round="2"
						  :vertical="orientation === 'vertical'"/>
		<br>
		
	    </div>
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

.container-tags {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.container-heatmap {

    align-items: center;
    margin-top: 50px;
}

</style>