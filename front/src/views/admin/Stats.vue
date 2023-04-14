<script setup>

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
import Donut from './Donut.vue';
import { ref } from "vue"; 

import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data } from '../../data';
import KProgress from 'k-progress';

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
    <div>
        <div class="container-table">
            <div class="container-heatmap">
                    <p class="text">Taux de contributions des developpeurs</p>
                <calendar-heatmap class="heatmap-component" :values="InteractionDates" :end-date="endDate" :style="{'max-width': orientation === 'vertical' ? '145px' :  '800px'}" :round="2"
                                :vertical="orientation === 'vertical'"/>
            
            </div>
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
                <tr>
                    <td>Date de debut/fin du collecteur </td>
                    <td>2023-01-02  to  2023-03-30</td>
                    
                </tr>
                <tr>
                    <k-progress :value="stats.nbNodes" :max="200000" :color="'#00b894'" :stroke="10" :size="100" :show-value="true" :show-text="true" :text="stats.nbNodes + ' / 200000'"></k-progress>
                    <td>Nombre de noeuds(max 200 000)</td>
                    <td>{{ stats.nbNodes }}</td>
                </tr>

                <tr>
                    <td>Nombre de relations(max 400 000)</td>
                    <td>{{ stats.nbRelations}}</td>
                </tr>

            </table>
            
        </div>
        
    </div>


    

</template>

<style scoped>

.container-table {
    background-color: rgb(248, 249, 250);
    padding: 30px;
    height: 100%
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
    margin-top: 20px;
    margin-bottom: 30px;
}

.heatmap-component {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    max-width: 800;
    max-height: 800px;
}

.text {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

</style>