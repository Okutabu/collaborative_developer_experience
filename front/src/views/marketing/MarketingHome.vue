<script setup>

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';

import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data } from '../../data';
import PieChart from '../../components/PieChart.vue';

var endDate = new Date('2023-03-27');
var orientation= 'horizontal';

const adminStore = useAdminStore();
const { stats, InteractionDates } = storeToRefs(adminStore);


</script>

<template>

    <div class="container-title">
        <h1>Le Futur De La Collaboration <br><span>Sur CDE</span></h1>   
    </div>
    <div class="container-stats">
        <div class="stats-container">
            <div class="stat-container">
                <div class="stat-circle">
                    <p class="stat-value">{{ stats.nbInteractions - stats.nbAnswers }}</p>
                </div>
                <p class="stat-label">nombre de question posées</p>
                <p class="stat-p">Ce dernier mois, c'est {{ stats.nbInteractions - stats.nbAnswers }} questions qui ont été posé sur stackoverflow par les developpeur PTC inscrit sur la plateforme</p>
            </div>
            <div class="stat-container">
                <div class="stat-circle">
                    <p class="stat-value">{{ stats.nbAnswers }}</p>
                </div>
                <p class="stat-label">nombre de réponses</p>
                <p class="stat-p">Ce dernier mois, c'est {{ stats.nbAnswers }} réponses sur stackoverflow par les developpeur PTC inscrit sur la plateforme</p>
            </div>
        </div>
        <div class="container-trimestre-review">
            <div class="container-heatmap">
                <calendar-heatmap class="heatmap-component" :values="InteractionDates" :end-date="endDate" :style="{'max-width': orientation === 'vertical' ? '145px' :  '800px'}" :round="2" :vertical="orientation === 'vertical'"/>
            
            </div>
        </div>
        <div class="container-global-review">
            <div class="container-active-user">
                <div class="stat-circle circle-rouge">
                    <p class="stat-value"> {{ stats.nbActiveUsers }}</p>
                    <!-- <PieChart :nbUser="stats.nbUsers" :activeUser="stats.nbActiveUsers" /> -->
                </div>
                <p class="stat-label">nombre d'utilisateur actifs</p>
            </div>
            
            <div class="container-techno-cloud">
                <p>nuage des techno utilisées</p>
                {{ stats.topTags }}
            </div>

        </div>
    </div>

</template>

<style scoped>


/* div, p{
    border: 1px solid black;
} */

.container-title {
    display: flex;
    justify-content: center;
}

.container-title h1 {
    font-size: 45px;
    font-weight: bold;
    text-align: center;
    margin-top: 80px;
}

.container-title h1 span {
    color: #25B3C3;
}

.container-stats {
    margin: 20px;
}
.stats-container {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;

}

.stat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stat-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #25B3C3;
  margin-right: 10px;
}

.circle-rouge {
    background-color: #FF0044;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
}

.stat-label {
  font-size: 18px;
  color: #666;
}


.container-trimestre-review {
    margin-left: 25%;
    margin-top: 50px;
    margin-right: 25%;
}

.container-global-review {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    height: 500px;
    width: 100%;
}

.container-active-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
}

.stat-p {
    width: 40%;
    text-align: center;
}



</style>