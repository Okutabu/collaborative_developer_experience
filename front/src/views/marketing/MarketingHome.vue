<script setup>

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';

import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data } from '../../data';

var endDate = new Date('2023-03-27');
var orientation= 'horizontal';

const adminStore = useAdminStore();
const { stats, InteractionDates } = storeToRefs(adminStore);
adminStore.getStats();
adminStore.getInteractionDates();

</script>

<template>

    <div class="container-stats">
        <div class="container-month-review">
            <div>Avril</div>
            <div class="container-nbQuestion">
                nombre de question posées
            {{ stats.nbInteractions - stats.nbAnswers }}
            </div>
            
            <div class="container-nbReponse">
                nombre de question repondues
            {{ stats.nbAnswers }}
            </div>
            
        </div>
        <div class="container-trimestre-review">
            <div class="container-heatmap">
                    <p class="text">Taux de contributions des developpeurs</p>
                <calendar-heatmap class="heatmap-component" :values="InteractionDates" :end-date="endDate" :style="{'max-width': orientation === 'vertical' ? '145px' :  '800px'}" :round="2" :vertical="orientation === 'vertical'"/>
            
            </div>
        </div>
        <div class="container-global-review">
            <div class="container-active-user">
                <p>nombre d'utilisateur actifs (donuts)</p>
                {{ stats.nbActiveUsers }}
                {{ stats.nbUsers }}
            </div>
            
            <div class="container-techno-cloud">
                <p>nuage des techno utilisées</p>
                {{ stats.topTags }}
            </div>

        </div>
    </div>

</template>

<style scoped>

.container-month-review {
   margin: 20px;
}

.container-trimestre-review {
   margin: 20px;
}

.container-global-review {
   margin: 20px;
}

</style>